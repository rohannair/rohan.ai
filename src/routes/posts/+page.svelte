<script lang="ts">
  import type { PageData } from "./$types";
  import Time from "svelte-time"
  import SvelteSeo from "svelte-seo";

  export let data: PageData;
</script>

<SvelteSeo
  title="Posts & Insights - Rohan Nair"
  description="Articles and insights on software architecture, startup technology, AI/LLM systems, and building products that scale from a fractional CTO perspective."
  canonical="https://rohan.ai/posts"
  openGraph={{
    title: "Posts & Insights - Rohan Nair",
    description: "Articles and insights on software architecture, startup technology, AI/LLM systems, and building products that scale from a fractional CTO perspective.",
    url: "https://rohan.ai/posts",
    type: "website",
  }}
  twitter={{
    card: "summary",
    title: "Posts & Insights - Rohan Nair",
    description: "Articles and insights on software architecture, startup technology, AI/LLM systems, and building products that scale from a fractional CTO perspective.",
  }}
/>

<h1 class="mb-6 text-sm font-mono uppercase tracking-[0.2em] text-gray-400">
  Writing
</h1>
<ul class="grid gap-6 list-none p-0 m-0 w-full not-prose">
  {#each data.posts as { meta, path }}
    <li class="grid gap-2 p-0 m-0 group">
      <h2 class="mb-0">
        <a href={path} class="text-xl font-semibold font-headings text-gray-100 no-underline group-hover:text-primary-300 transition-colors">
          {meta.title}
        </a>
      </h2>
      <p class="text-sm font-mono text-gray-500">
        <Time relative timestamp={meta.createdAt} format="MMM D, YYYY" />
      </p>
    </li>
  {/each}
</ul>

<div class="pagination">
  <!-- Add pagination controls here -->
</div>
