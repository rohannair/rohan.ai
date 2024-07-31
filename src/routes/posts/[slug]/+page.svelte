<script lang="ts">
  import type { PageData } from "./$types";
  import Time from "svelte-time";
  import SvelteSeo from "svelte-seo";

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

<div class="space-y-4">
  <div>
    <h1 class="text-4xl font-bold">{meta.title}</h1>
    <p class="mt-0 text-sm text-gray-400">
      Published <Time
        relative
        timestamp={meta.createdAt}
        format="dddd @ h:mm A · MMMM D, YYYY"
      />
    </p>
  </div>

  <article class="article mt-8 max-w-4xl">
    <svelte:component this={component} />
  </article>
</div>
