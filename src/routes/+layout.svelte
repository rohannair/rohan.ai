<script lang="ts">
  import "@unocss/reset/tailwind.css";
  import "uno.css";
  import "../app.css";

  import Footer from "./footer.svelte";
</script>

<main
  class="w-full min-h-full grid grid-rows-layout bg-gradient-to-br from-gray-800 to-gray-900 text-white"
>
  <div />
  <div class="flex flex-col p-4 med:py-4 med:px-6 items-center">
    <div class="prose lg:prose-xl prose-invert">
      <slot />
    </div>
  </div>

  <Footer />
</main>
