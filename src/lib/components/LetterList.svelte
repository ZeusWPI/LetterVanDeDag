<script lang="ts">
	import type { LetterVanDeDag } from '$lib/types';

	let { letters, filter }: { letters: LetterVanDeDag[], filter: string } = $props();

	$inspect(filter);

	let filteredLetters = $derived(filter === '' ? letters : letters.filter(letter => letter.letter.toLowerCase().includes(filter.toLowerCase())));

</script>

<div class="w-full rounded-lg border-2 border-gray-100 p-3 dark:border-zinc-700">
	<span class="mb-2 block text-xl font-bold">Leaderboard</span>

	<div class="mt-2 overflow-x-auto">
		<table class="w-full border-collapse text-left">
			<thead>
			<tr class="border-b-2 border-gray-200 dark:border-zinc-600">
				<th class="w-12 px-2 py-2 font-bold">Day</th>
				<th class="px-2 py-2 font-bold">Image</th>
				<th class="px-2 py-2 font-bold">Letter</th>
				<th class="px-2 py-2 text-right font-bold">Declarer</th>
			</tr>
			</thead>
			<tbody>
			{#each filteredLetters as letter}
				<tr
					class="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800/50"
				>
					<td class="px-2 py-2 font-semibold">{letter.created_at}</td>
					<td>
						{#if letter.imageUrl}
							<img src={letter.imageUrl} class="size-6" alt={letter.letter} />
						{/if}
					</td>
					<td class="flex items-center gap-2 px-2 py-2">
						<span class="wrap-anywhere">{letter.letter}</span>
					</td>
					<td class="px-2 py-2 text-right font-mono">{letter.added_by.username}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
</div>