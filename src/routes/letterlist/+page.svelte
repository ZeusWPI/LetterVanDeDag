<script lang="ts">
	import type { LoadReturn } from './+page.server';
	import LetterList from '$lib/components/LetterList.svelte';

	let { data }: { data: LoadReturn } = $props();
	let letters = $derived(Object.values(data.letters));
	let filter = $state('');
	$inspect(filter);
</script>

<div class="w-full max-w-15/16 lg:max-w-6xl self-center">
	<input class="w-full rounded-lg border-gray-200 border-2 py-1 px-2 mb-6" placeholder="Filter..."
	       bind:value={filter} />
	<LetterList {letters} {filter} />
</div>

