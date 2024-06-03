<script lang="ts">
  import * as constants from "$lib/constants";
  import Nav from "$lib/components/Nav.svelte";
</script>

<svelte:head>
  <title>{constants.title}</title>
  <meta name="description" content={constants.description} />
</svelte:head>

<header>
  <Nav />
</header>
