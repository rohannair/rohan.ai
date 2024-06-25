<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  const { component, meta } = data;
</script>

<svelte:head>
  <title>{meta.title}</title>
</svelte:head>

<div class="space-y-4">
  <h1 class="text-4xl font-bold">{meta.title}</h1>
  <p class="text-sm text-gray-400">
    Published on {new Date(meta.createdAt).toDateString()}
  </p>

  <article class="mt-8 prose prose-invert lg:prose-xl">
    <svelte:component this={component} />
  </article>
</div>
