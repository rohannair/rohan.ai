<script lang="ts">
  import "../app.css";

  import Footer from "../lib/components/footer.svelte";
  import Header from "../lib/components/header.svelte";
</script>

<div class="site-shell">
  <Header />

  <main class="site-main">
    <div class="site-container py-16 md:py-24 prose prose-lg prose-invert">
      <slot />
    </div>
  </main>

  <Footer />
</div>
