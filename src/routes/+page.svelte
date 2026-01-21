<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import type { LetterVanDeDag, ZAuthUser } from '$lib/types';
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	import { getISOString } from '$lib/util';

	let { data } = $props();
	let user = $derived(data.session?.user as ZAuthUser);

	let selectedDate = $state(new Date(2026, 0, 18));
	let selectedLetter: LetterVanDeDag = $derived(data.letters[getISOString(selectedDate)]);
</script>


<div class="flex flex-col lg:flex-row gap-6 w-full justify-center items-center lg:items-start">
	<div class="lg:w-2/5 w-6/7">
		<Calendar bind:selectedDate={selectedDate} letterData={data.letters} />
	</div>
	{#if selectedLetter || user?.admin}
		<div class="w-6/7 lg:w-1/5 flex flex-col gap-4">
			<InfoPanel {selectedLetter} {selectedDate} {user} declarers={data.declarers} />
		</div>
	{/if}
</div>