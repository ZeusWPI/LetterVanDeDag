<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import type { LetterVanDeDag, ZAuthUser } from '$lib/types';
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	import { getISOString } from '$lib/util';
	import Leaderboard from '$lib/components/Leaderboard.svelte';

	let { data } = $props();
	let user = $derived(data.session?.user as ZAuthUser);

	let selectedDate = $state(new Date());
	let selectedLetter: LetterVanDeDag = $derived(data.letters[getISOString(selectedDate)]);
</script>

<div class="flex w-full flex-col items-center gap-10">
	<div
		class="grid w-full px-5 lg:px-0 lg:w-5/7 grid-cols-1 lg:grid-cols-4 items-center justify-center gap-6 lg:items-start">
		<div class="lg:mt-15 row-start-3 lg:row-start-1">
			<Leaderboard leaderboard_users={data.leaderboard_users} />
		</div>
		<div class="col-span-2">
			<Calendar bind:selectedDate letterData={data.letters} />
		</div>
		{#if selectedLetter || user?.admin}
			<div class="flex flex-col gap-4 row-start-2 lg:row-start-1 lg:col-start-4 lg:mt-15">
				<InfoPanel {selectedLetter} {selectedDate} {user} declarers={data.declarers} />
			</div>
		{/if}
	</div>
</div>
