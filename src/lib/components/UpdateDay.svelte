<script lang="ts">
	import { getISOString } from '$lib/util';
	import type { Declarer } from '$lib/types';

	let { declarers, selectedDate }: { declarers: Declarer[], selectedDate: Date } = $props();

</script>

<div class="border-2 p-3 border-gray-100 dark:border-zinc-700 rounded-lg">
	<span class="text-xl font-bold">Update Data</span>
	<form class="mt-2" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="created_at" value={getISOString(selectedDate)}>
		<div class="flex flex-row mb-2">
			<label for="letter" class="font-bold">Letter</label><input
			class="ml-2 px-2 border-gray-100 dark:border-zinc-700 border-2 rounded w-full"
			name="letter"
			placeholder="Letter*">
		</div>
		<div class="flex flex-row mb-2">
			<label for="image" class="font-bold">ImageURL</label><input
			class="ml-2 px-2 border-gray-100 dark:border-zinc-700 border-2 rounded w-full"
			name="image"
			type="file">
		</div>
		<div class="flex flex-row gap-2">
			<label for="id" class="font-bold">Declarer </label>
			<select name="declarer">
				{#each declarers as declarer}
					<option value={declarer.id} selected="{declarer.id===385}">{declarer.username}</option>
				{/each}
			</select>
		</div>

		<button class="mt-2 bg-zoranje active:bg-orange-600 text-white w-full px-2 py-1 rounded" type="submit"
		        formaction="/new_letter">
			Update
		</button>
	</form>
</div>