<script lang="ts">
  import * as constants from "$lib/constants";
</script>

<svelte:head>
  <title>{constants.title}</title>
  <meta name="description" content={constants.description} />
</svelte:head>

<header
  class="flex h-16 w-full items-center justify-between px-4 md:px-6 bg-gray-900"
>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="/" class="text-lg font-bold">Rohan Nair</a>
  <nav class="flex items-center gap-4 md:gap-6">
    <a
      href="/posts"
      class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors md:text-base"
      >Posts</a
    >
    <a
      href="/contact"
      class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors md:text-base"
      >Contact</a
    >
  </nav>
</header>
