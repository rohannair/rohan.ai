<script lang="ts">
  import "@unocss/reset/tailwind.css";
  import "uno.css";
  import "../app.css";

  import Footer from "../lib/components/footer.svelte";
  import Header from "../lib/components/header.svelte";
</script>

<div class="flex flex-col min-h-screen bg-gray-900 text-white mx-auto w-full">
  <Header />

  <main class="container mx-auto prose lg:prose-xl prose-invert">
    <slot />
  </main>

  <Footer />
</div>
