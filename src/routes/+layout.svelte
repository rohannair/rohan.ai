<script lang="ts">
  import "@unocss/reset/tailwind.css";
  import "uno.css";
  import "../app.css";

  import Header from "../components/header.svelte";
  import Footer from "../components/footer.svelte";
</script>

<div class="flex flex-col min-h-screen bg-gray-900 text-white">
  <Header />

  <main class="flex-grow w-full">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="prose lg:prose-xl prose-invert max-w-none">
        <slot />
      </div>
    </div>
  </main>

  <Footer />
</div>

<style>
  :global(body) {
    @apply bg-gray-900 text-white;
  }
</style>
