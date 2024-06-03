<script lang="ts">
  import * as constants from "$lib/constants";

  export let data;
  const { post, metadata } = data;
</script>

<svelte:head>
  <title>{metadata.title} | {constants.title}</title>
  <meta name="description" content={metadata.description} />
</svelte:head>

<div class="flex flex-col w-full mt-8 mb-6">
  <h1 class="text-4xl text-left font-bold">{metadata.title}</h1>
  <p class="text-sm text-gray-300">Published: {metadata.date}</p>
</div>

<section class="flex w-full">
  <article class="prose">
    {@html post}
  </article>
</section>
