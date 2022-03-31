<script context="module" lang="ts">
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<pre>
		{ JSON.stringify($$props) }
	</pre>

	<a sveltekit:prefetch href="/login">Login</a>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
