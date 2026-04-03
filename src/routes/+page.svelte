<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import type { LetterVanDeDag, ZAuthUser } from '$lib/types';
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	import { getISOString } from '$lib/util';
	import Leaderboard from '$lib/components/Leaderboard.svelte';
	import type { LoadReturn } from './+page.server';
	import Timeline from '$lib/components/timeline/Timeline.svelte';

	let { data }: { data: LoadReturn } = $props();
	let user = $derived(data.session?.user as ZAuthUser);

	let selectedDate = $state(new Date());
	let selectedLetter: LetterVanDeDag = $derived(data.letters[getISOString(selectedDate)]);
</script>

<div class="flex w-full flex-col items-center gap-10">
	<div
		class="grid w-full grid-cols-1 items-center justify-center gap-y-6 px-5 lg:w-6/7 lg:grid-cols-5 lg:items-start lg:gap-6 lg:px-0"
	>
		<div class="row-start-3 lg:row-start-1 lg:mt-15">
			<Leaderboard leaderboard_users={data.leaderboard_users} />
		</div>
		<div class="col-span-3">
			<Calendar bind:selectedDate letterData={data.letters} />
		</div>
		{#if selectedLetter || user?.admin}
			<div class="row-start-2 flex flex-col gap-4 lg:col-start-5 lg:row-start-1 lg:mt-15">
				<InfoPanel {selectedLetter} {selectedDate} {user} declarers={data.declarers} />
			</div>
		{/if}
	</div>
	<div class="w-6/7">
		<Timeline streaks={data.streaks}></Timeline>
	</div>
</div>
