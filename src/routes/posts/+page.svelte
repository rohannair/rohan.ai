<script lang="ts">
  import type { PageData } from "./$types";
  import Time from "svelte-time"

  export let data: PageData;
</script>

<h1 class="text-4xl mb-5">Posts</h1>
<ul class="grid gap-6 list-none p-0 m-0 w-full not-prose">
  {#each data.posts as { meta, path }}
    <li class="grid gap-2 p-0 m-0">
      <h2 class="mb-0">
        <a href={path} class="text-xl font-semibold no-underline">
          {meta.title}
        </a>
      </h2>
      <p class="text-gray-500">
        Posted <Time relative timestamp={meta.createdAt} format="dddd @ h:mm A · MMMM D, YYYY" />
      </p>
    </li>
  {/each}
</ul>

<div class="pagination">
  <!-- Add pagination controls here -->
</div>
