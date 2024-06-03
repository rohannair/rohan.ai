<script lang="ts">
  import Tag from "$lib/components/Tag.svelte";
  import type { Post } from "$lib/types";
  export let post: Post;
</script>

<li class="flex flex-col flex-grow gap-1">
  <a href={`posts/${post.slug}`} class="no-underline">
    <div class="flex flex-col gap-1">
      <p class="text-sm text-gray-500 dark:text-gray-400 m-0">
        {post.date}
      </p>
      <h2 class="text-xl font-bold group-hover:underline m-0">
        {post.title}
      </h2>
    </div>
  </a>
  <p class="text-gray-500 dark:text-gray-400">{post.description}</p>

  <div class="flex items-center gap-2 mt-2">
    {#each post.categories as category}
      <Tag>{category}</Tag>
    {/each}
  </div>
</li>
