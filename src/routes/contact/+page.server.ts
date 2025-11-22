import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const company = data.get('company') as string;
    const deck = data.get('deck') as string;
    const message = data.get('message') as string;

    if (!name || !email || !company || !message) {
      return fail(400, { missing: true });
    }

    const resend = new Resend(RESEND_API_KEY);

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
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
                <td style="padding: 8px 0;"><a href="${company.startsWith('http') ? company : `https://${company}`}" style="color: #2563eb;">${company}</a></td>
              </tr>
              ${deck ? `
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Pitch Deck:</strong></td>
                <td style="padding: 8px 0;"><a href="${deck}" style="color: #2563eb;">View Deck</a></td>
              </tr>
              ` : ''}
            </table>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <strong style="display: block; margin-bottom: 10px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</strong>
              <div style="white-space: pre-wrap;">${message}</div>
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
