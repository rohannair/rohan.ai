import { createHmac, timingSafeEqual } from 'node:crypto';
import { dev } from '$app/environment';
import { fail } from '@sveltejs/kit';
import { env as publicEnv } from '$env/dynamic/public';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

const HONEYPOT_FIELD = 'website';
const TURNSTILE_FIELD = 'cf-turnstile-response';
const TURNSTILE_ACTION = 'contact';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MIN_SUBMIT_DELAY_MS = 500;
const FORM_TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_BLOCK_MS = 30 * 60 * 1000;

type RateLimitEntry = {
  attempts: number;
  windowStartedAt: number;
  blockedUntil?: number;
};

type TurnstileVerificationResult = {
  success: boolean;
  action?: string;
  hostname?: string;
  'error-codes'?: string[];
};

// Best-effort throttling inside a single Node process.
const contactAttempts = new Map<string, RateLimitEntry>();

function getTextEntry(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toHttpsUrl(value: string) {
  if (!value) {
    return null;
  }

  const prefixedValue = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const url = new URL(prefixedValue);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function isTurnstileConfigured() {
  return Boolean(publicEnv.PUBLIC_TURNSTILE_SITE_KEY && (env.TURNSTILE_SECRET_KEY || dev));
}

function signFormToken(renderedAt: number) {
  const secret = env.TURNSTILE_SECRET_KEY || env.RESEND_API_KEY || (dev ? 'dev-contact-form' : '');

  if (!secret) {
    return '';
  }

  return createHmac('sha256', secret).update(String(renderedAt)).digest('hex');
}

async function verifyTurnstileToken(token: string, clientIp: string, hostname: string) {
  if (!env.TURNSTILE_SECRET_KEY) {
    return dev;
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: clientIp,
    }),
  });

  if (!response.ok) {
    throw new Error(`Turnstile verification failed with status ${response.status}`);
  }

  const result = await response.json() as TurnstileVerificationResult;

  return result.success
    && (!result.action || result.action === TURNSTILE_ACTION)
    && (!result.hostname || result.hostname === hostname);
}

function isValidFormToken(renderedAt: number, formToken: string) {
  const expectedToken = signFormToken(renderedAt);

  if (!expectedToken || formToken.length !== expectedToken.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(formToken), Buffer.from(expectedToken));
}

function getClientIp(request: Request, getClientAddress: () => string) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const flyClientIp = request.headers.get('fly-client-ip')?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();

  return forwardedFor || flyClientIp || realIp || getClientAddress();
}

function isRateLimited(ip: string, now: number) {
  for (const [key, entry] of contactAttempts.entries()) {
    if (entry.blockedUntil && entry.blockedUntil <= now) {
      contactAttempts.delete(key);
      continue;
    }

    if (!entry.blockedUntil && now - entry.windowStartedAt > RATE_LIMIT_WINDOW_MS) {
      contactAttempts.delete(key);
    }
  }

  const existingEntry = contactAttempts.get(ip);

  if (!existingEntry) {
    contactAttempts.set(ip, { attempts: 1, windowStartedAt: now });
    return false;
  }

  if (existingEntry.blockedUntil && existingEntry.blockedUntil > now) {
    return true;
  }

  if (now - existingEntry.windowStartedAt > RATE_LIMIT_WINDOW_MS) {
    contactAttempts.set(ip, { attempts: 1, windowStartedAt: now });
    return false;
  }

  existingEntry.attempts += 1;

  if (existingEntry.attempts > RATE_LIMIT_MAX_ATTEMPTS) {
    existingEntry.blockedUntil = now + RATE_LIMIT_BLOCK_MS;
    contactAttempts.set(ip, existingEntry);
    return true;
  }

  contactAttempts.set(ip, existingEntry);
  return false;
}

export const load: PageServerLoad = async () => {
  const renderedAt = Date.now();

  return {
    formToken: signFormToken(renderedAt),
    renderedAt,
    turnstileSiteKey: isTurnstileConfigured() ? publicEnv.PUBLIC_TURNSTILE_SITE_KEY : '',
  };
};

export const actions = {
  default: async ({ getClientAddress, request, url }) => {
    const data = await request.formData();
    const name = getTextEntry(data.get('name'));
    const email = getTextEntry(data.get('email'));
    const company = getTextEntry(data.get('company'));
    const deck = getTextEntry(data.get('deck'));
    const message = getTextEntry(data.get('message'));
    const formToken = getTextEntry(data.get('formToken'));
    const turnstileToken = getTextEntry(data.get(TURNSTILE_FIELD));
    const honeypotValue = getTextEntry(data.get(HONEYPOT_FIELD));
    const renderedAt = Number.parseInt(getTextEntry(data.get('renderedAt')), 10);
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const now = Date.now();

    if (honeypotValue) {
      return { success: true };
    }

    if (origin && origin !== url.origin) {
      return fail(400, { invalidSubmission: true });
    }

    if (referer && !referer.startsWith(`${url.origin}/contact`)) {
      return fail(400, { invalidSubmission: true });
    }

    if (!Number.isFinite(renderedAt) || renderedAt > now + 60_000 || now - renderedAt > FORM_TOKEN_MAX_AGE_MS) {
      return fail(400, { invalidSubmission: true });
    }

    if (now - renderedAt < MIN_SUBMIT_DELAY_MS || !isValidFormToken(renderedAt, formToken)) {
      return fail(400, { invalidSubmission: true });
    }

    if (!name || !email || !company || !message) {
      return fail(400, { missing: true });
    }

    if (!isTurnstileConfigured()) {
      console.error('Turnstile is not configured for the contact form');
      return fail(503, { captchaUnavailable: true });
    }

    const clientIp = getClientIp(request, getClientAddress);

    if (isRateLimited(clientIp, now)) {
      return fail(429, { rateLimited: true });
    }

    if (!turnstileToken) {
      return fail(400, { captcha: true });
    }

    try {
      const isTurnstileValid = await verifyTurnstileToken(turnstileToken, clientIp, url.hostname);

      if (!isTurnstileValid) {
        return fail(400, { captcha: true });
      }
    } catch (error) {
      console.error('Turnstile verification error:', error);
      return fail(503, { captchaUnavailable: true });
    }

    const resend = new Resend(env.RESEND_API_KEY);
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedCompany = escapeHtml(company);
    const escapedMessage = escapeHtml(message);
    const companyUrl = toHttpsUrl(company);
    const deckUrl = toHttpsUrl(deck);
    const companyMarkup = companyUrl
      ? `<a href="${companyUrl}" style="color: #2563eb;">${escapedCompany}</a>`
      : escapedCompany;
    const deckMarkup = deck && deckUrl
      ? `
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Pitch Deck:</strong></td>
                <td style="padding: 8px 0;"><a href="${deckUrl}" style="color: #2563eb;">View Deck</a></td>
              </tr>
              `
      : deck
        ? `
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Pitch Deck:</strong></td>
                <td style="padding: 8px 0;">${escapeHtml(deck)}</td>
              </tr>
              `
        : '';

    try {
      const { error } = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['rn@rohan.ai'],
        subject: `New Inquiry: ${company} (${name})`,
        replyTo: email,
        html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
            <h2 style="color: #111; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Inquiry</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${escapedName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${escapedEmail}" style="color: #2563eb;">${escapedEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
                <td style="padding: 8px 0;">${companyMarkup}</td>
              </tr>
              ${deckMarkup}
            </table>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <strong style="display: block; margin-bottom: 10px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</strong>
              <div style="white-space: pre-wrap;">${escapedMessage}</div>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        return fail(500, { error: true });
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error:', error);
      return fail(500, { error: true });
    }
  }
} satisfies Actions;
