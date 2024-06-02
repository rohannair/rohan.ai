<script lang="ts">
  import "@unocss/reset/tailwind.css";
  import "uno.css";
  import "../app.css";
</script>

<div class="w-full">
  <div class="flex h-full min-h-full flex-col bg-gray-900 text-white">
    <div class="w-full">
      <div class="prose lg:prose-xl prose-invert m-auto p-4 md:p-0">
        <slot />
      </div>
    </div>
  </div>
</div>
