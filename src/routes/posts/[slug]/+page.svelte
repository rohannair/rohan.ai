<script lang="ts">
  import SvelteSeo from "svelte-seo";
  import Time from "svelte-time";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { component, meta } = data;
</script>

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-nord.min.css"
    rel="stylesheet"
  />
</svelte:head>

<SvelteSeo
  title={meta.title}
  description={meta.description}
  openGraph={{
    title: meta.title,
    description: meta.description,
    type: "article",
    article: {
      published_time: meta.createdAt,
    },
  }}
/>

<div class="space-y-8">
  <header class="border-b border-gray-800 pb-8">
    <h1 class="mb-3 text-3xl sm:text-4xl font-semibold tracking-tight font-headings text-gray-100">{meta.title}</h1>
    <p class="text-xs font-mono text-gray-500 uppercase tracking-wide">
      <Time
        timestamp={meta.createdAt}
        format="MMMM D, YYYY"
      />
    </p>
  </header>

  <article class="mt-8 max-w-none">
    <svelte:component this={component} />
  </article>
</div>
