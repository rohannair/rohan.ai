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

<header class="mb-12">
  <p class="text-[13px] font-mono text-gray-500 uppercase tracking-wider mb-4">
    <Time
      timestamp={meta.createdAt}
      format="MMMM D, YYYY"
    />
  </p>
  <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight font-headings text-gray-100 m-0">{meta.title}</h1>
</header>

<article class="max-w-none">
  <svelte:component this={component} />
</article>
