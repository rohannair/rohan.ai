<script lang="ts">
  import "@unocss/reset/tailwind.css";
  import "uno.css";
  import "../app.css";

  import Header from "./header.svelte";
  import Footer from "./footer.svelte";
</script>

<main
  class="w-full min-h-full grid grid-rows-layout bg-gradient-to-br from-gray-800 to-gray-900 text-white"
>
  <Header />

  <div class="flex flex-col p-4 med:py-4 med:px-6 items-center">
    <slot />
  </div>

  <Footer />
</main>
