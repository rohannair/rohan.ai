<script lang="ts">
  import { enhance } from '$app/forms';
  import SvelteSeo from "svelte-seo";
  import type { ActionData } from './$types';

  export let form: ActionData;

  let loading = false;
</script>

<SvelteSeo
  title="Contact | Rohan Nair"
  description="Get in touch with Rohan Nair for fractional CTO services, software architecture consulting, or advisory."
/>

<div class="max-w-xl mx-auto">
  <div class="mb-12">
    <h1 class="mb-4 text-3xl sm:text-4xl font-semibold tracking-tight font-headings text-gray-100">
      Get in touch
    </h1>
    <p class="text-base sm:text-lg text-gray-300 leading-relaxed">
      Interested in working together? Fill out the form below and I'll get back to you as soon as I can.
    </p>
  </div>

  {#if form?.success}
    <div class="p-6 border border-green-500/20 bg-green-500/10 rounded-lg text-green-400">
      <h3 class="text-lg font-semibold mb-2 font-headings">Message sent successfully</h3>
      <p class="text-sm">Thanks for reaching out. I'll be in touch shortly.</p>
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
        return async ({ update }) => {
          loading = false;
          await update();
        };
      }}
      class="space-y-6"
    >
      <div class="grid gap-6 sm:grid-cols-2">
        <div class="space-y-2">
          <label for="name" class="block text-xs font-mono uppercase tracking-wider text-gray-500">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            class="w-full bg-gray-900/50 border border-gray-800 rounded px-3 py-2 text-gray-100 placeholder-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors outline-none"
            placeholder="Jane Doe"
          />
        </div>
        <div class="space-y-2">
          <label for="email" class="block text-xs font-mono uppercase tracking-wider text-gray-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            class="w-full bg-gray-900/50 border border-gray-800 rounded px-3 py-2 text-gray-100 placeholder-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors outline-none"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label for="company" class="block text-xs font-mono uppercase tracking-wider text-gray-500">
          Company Website
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          class="w-full bg-gray-900/50 border border-gray-800 rounded px-3 py-2 text-gray-100 placeholder-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors outline-none"
          placeholder="example.com"
        />
      </div>

      <div class="space-y-2">
        <label for="deck" class="block text-xs font-mono uppercase tracking-wider text-gray-500">
          Pitch/Sales Deck URL (Optional)
        </label>
        <input
          type="url"
          id="deck"
          name="deck"
          class="w-full bg-gray-900/50 border border-gray-800 rounded px-3 py-2 text-gray-100 placeholder-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors outline-none"
          placeholder="https://docsend.com/..."
        />
      </div>

      <div class="space-y-2">
        <label for="message" class="block text-xs font-mono uppercase tracking-wider text-gray-500">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows="6"
          class="w-full bg-gray-900/50 border border-gray-800 rounded px-3 py-2 text-gray-100 placeholder-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors outline-none resize-y"
          placeholder="Tell me about your project, timeline, and goals..."
        ></textarea>
      </div>

      <div class="pt-2">
        <button
          type="submit"
          disabled={loading}
          class="px-6 py-2.5 bg-gray-100 text-gray-950 font-semibold rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      
      {#if form?.missing}
        <p class="text-red-400 text-sm mt-2">Please fill out all required fields.</p>
      {/if}
    </form>
  {/if}
</div>
