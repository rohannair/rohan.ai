<script lang="ts">
  import "@unocss/reset/tailwind.css";
  import "uno.css";
  import "../app.css";

  import Footer from "../lib/components/footer.svelte";
  import Header from "../lib/components/header.svelte";
</script>

<div class="site-shell">
  <Header />

  <main class="site-main">
    <div class="site-container py-12 md:py-16 prose lg:prose-lg prose-invert">
      <slot />
    </div>
  </main>

  <Footer />
</div>
