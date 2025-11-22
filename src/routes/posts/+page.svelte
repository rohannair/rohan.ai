<script lang="ts">
  import type { PageData } from "./$types";
  import Time from "svelte-time"

  export let data: PageData;
</script>

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
