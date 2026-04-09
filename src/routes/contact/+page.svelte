<script lang="ts">
  import { enhance } from '$app/forms';
  import SvelteSeo from "svelte-seo";
  import type { ActionData, PageData } from './$types';

  export let data: PageData;
  export let form: ActionData;

  let loading = false;

  function resetTurnstile() {
    if (typeof window === 'undefined') {
      return;
    }

    (window as Window & { turnstile?: { reset: (widgetId?: string) => void } }).turnstile?.reset();
  }
</script>

<svelte:head>
  {#if data.turnstileSiteKey}
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  {/if}
</svelte:head>

<SvelteSeo
  title="Contact - Fractional CTO Services | Rohan Nair"
  description="Get in touch with Rohan Nair for fractional CTO services, software architecture consulting, startup advisory, or investment inquiries in DeepTech and HardTech."
  canonical="https://rohan.ai/contact"
  openGraph={{
    title: "Contact - Fractional CTO Services | Rohan Nair",
    description: "Get in touch with Rohan Nair for fractional CTO services, software architecture consulting, startup advisory, or investment inquiries in DeepTech and HardTech.",
    url: "https://rohan.ai/contact",
    type: "website",
  }}
  twitter={{
    card: "summary",
    title: "Contact - Fractional CTO Services | Rohan Nair",
    description: "Get in touch with Rohan Nair for fractional CTO services, software architecture consulting, startup advisory, or investment inquiries in DeepTech and HardTech.",
  }}
/>

<div class="max-w-lg">
  <div class="mb-14">
    <h1 class="mb-5 text-3xl sm:text-4xl font-semibold tracking-tight font-headings text-gray-100">
      Get in touch
    </h1>
    <p class="text-gray-400 leading-[1.75]">
      Interested in working together? Fill out the form below and I'll get back to you shortly.
    </p>
  </div>

  {#if !data.turnstileSiteKey}
    <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 text-sm text-amber-200/90">
      The contact form is temporarily unavailable. Email <a class="underline underline-offset-4" href="mailto:rn@rohan.ai">rn@rohan.ai</a> directly.
    </div>
  {:else if form?.success}
    <div class="p-6 border border-green-500/15 bg-green-500/5 rounded-lg text-green-400">
      <h3 class="text-lg font-medium mb-2 font-headings">Message sent successfully</h3>
      <p class="text-sm text-green-400/80">Thanks for reaching out. I'll be in touch shortly.</p>
      <button
        class="mt-4 text-sm underline underline-offset-4 hover:text-green-300"
        on:click={() => form = null}
      >
        Send another message
      </button>
    </div>
  {:else}
    <form
      method="POST"
      use:enhance={() => {
        loading = true;
        return async ({ result, update }) => {
          loading = false;
          await update();

          if (result.type !== 'success') {
            resetTurnstile();
          }
        };
      }}
      class="space-y-7"
    >
      <input type="hidden" name="formToken" value={data.formToken} />
      <input type="hidden" name="renderedAt" value={data.renderedAt} />

      <div class="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label for="website">Website</label>
        <input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div class="grid gap-7 sm:grid-cols-2">
        <div class="space-y-2.5">
          <label for="name" class="block text-[13px] font-mono uppercase tracking-wider text-gray-500">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            class="w-full bg-transparent border-0 border-b border-gray-800 px-0 py-2.5 text-gray-100 placeholder-gray-700 focus:border-gray-400 focus:ring-0 transition-colors outline-none"
            placeholder="Jane Doe"
          />
        </div>
        <div class="space-y-2.5">
          <label for="email" class="block text-[13px] font-mono uppercase tracking-wider text-gray-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            class="w-full bg-transparent border-0 border-b border-gray-800 px-0 py-2.5 text-gray-100 placeholder-gray-700 focus:border-gray-400 focus:ring-0 transition-colors outline-none"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div class="space-y-2.5">
        <label for="company" class="block text-[13px] font-mono uppercase tracking-wider text-gray-500">
          Company Website
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          class="w-full bg-transparent border-0 border-b border-gray-800 px-0 py-2.5 text-gray-100 placeholder-gray-700 focus:border-gray-400 focus:ring-0 transition-colors outline-none"
          placeholder="example.com"
        />
      </div>

      <div class="space-y-2.5">
        <label for="deck" class="block text-[13px] font-mono uppercase tracking-wider text-gray-500">
          Pitch/Sales Deck URL <span class="text-gray-700 normal-case tracking-normal">(optional)</span>
        </label>
        <input
          type="url"
          id="deck"
          name="deck"
          class="w-full bg-transparent border-0 border-b border-gray-800 px-0 py-2.5 text-gray-100 placeholder-gray-700 focus:border-gray-400 focus:ring-0 transition-colors outline-none"
          placeholder="https://docsend.com/..."
        />
      </div>

      <div class="space-y-2.5">
        <label for="message" class="block text-[13px] font-mono uppercase tracking-wider text-gray-500">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows="5"
          class="w-full bg-gray-900/30 border border-gray-800/60 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-700 focus:border-gray-600 focus:ring-0 transition-colors outline-none resize-y"
          placeholder="Tell me about your project, timeline, and goals..."
        ></textarea>
      </div>

      <div class="pt-2">
        <div
          class="cf-turnstile"
          data-sitekey={data.turnstileSiteKey}
          data-theme="dark"
          data-action="contact"
        ></div>
      </div>

      <div class="pt-4">
        <button
          type="submit"
          disabled={loading}
          class="px-6 py-2.5 bg-gray-100 text-gray-950 font-headings font-semibold text-sm rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {#if form?.missing}
        <p class="text-red-400 text-sm">Please fill out all required fields.</p>
      {/if}

      {#if form?.invalidSubmission}
        <p class="text-red-400 text-sm">Please refresh the page and try again.</p>
      {/if}

      {#if form?.rateLimited}
        <p class="text-red-400 text-sm">Too many attempts from this network. Please wait a bit and try again.</p>
      {/if}

      {#if form?.captcha}
        <p class="text-red-400 text-sm">Please complete the anti-spam check and try again.</p>
      {/if}

      {#if form?.captchaUnavailable}
        <p class="text-red-400 text-sm">Spam protection is temporarily unavailable. Please try again in a minute.</p>
      {/if}

      {#if form?.error}
        <p class="text-red-400 text-sm">Something went wrong while sending your message. Please try again.</p>
      {/if}
    </form>
  {/if}
</div>
