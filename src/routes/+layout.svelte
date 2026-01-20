<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Letter van de Dag</title>
</svelte:head>

<div class="flex flex-col items-center w-full min-h-screen">
	<Navbar />
	{@render children()}
	<div class="grow"></div>
	<Footer />
</div>