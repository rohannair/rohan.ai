<script lang="ts">
  import * as constants from "$lib/constants";
  import PostRow from "./PostRow.svelte";

  export let data;
</script>

<svelte:head>
  <title>Posts | {constants.title ?? ""}</title>
</svelte:head>

<div class="flex w-full mt-8 mb-6">
  <h1 class="text-4xl text-left font-bold">Posts</h1>
</div>

<section class="flex w-full">
  <ul class="flex list-none not-prose w-full">
    {#each data.posts as post}
      <PostRow {post} />
    {/each}
  </ul>
</section>
