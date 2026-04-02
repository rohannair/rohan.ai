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

<h1 class="mb-10 text-[13px] font-mono uppercase tracking-[0.2em] text-gray-500">
  Writing
</h1>
<ul class="grid gap-8 list-none p-0 m-0 w-full not-prose">
  {#each data.posts as { meta, path }}
    <li class="grid gap-1.5 p-0 m-0 group">
      <p class="text-[13px] font-mono text-gray-600 m-0">
        <Time relative timestamp={meta.createdAt} format="MMM D, YYYY" />
      </p>
      <h2 class="m-0">
        <a href={path} class="text-xl font-medium font-headings text-gray-200 no-underline group-hover:text-white transition-colors">
          {meta.title}
        </a>
      </h2>
    </li>
  {/each}
</ul>
