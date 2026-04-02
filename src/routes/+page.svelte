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
	<div class="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-start">
		<div class="w-6/7 lg:w-2/5">
			<Calendar bind:selectedDate letterData={data.letters} />
		</div>
		{#if selectedLetter || user?.admin}
			<div class="flex w-6/7 flex-col gap-4 lg:w-1/5">
				<InfoPanel {selectedLetter} {selectedDate} {user} declarers={data.declarers} />
			</div>
		{/if}
	</div>

	<div class="w-6/7 self-center lg:w-1/4">
		<Leaderboard leaderboard_users={data.leaderboard_users} />
	</div>
</div>
