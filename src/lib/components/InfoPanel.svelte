<script lang="ts">
	import { getISOString } from '$lib/util';

	let { selectedLetter, selectedDate, user, declarers } = $props();


</script>

{#if selectedLetter}
	<div class="border-2  p-3 border-gray-100 dark:border-zinc-700 flex flex-col rounded-lg lg:mt-10">
		<span class="text-xl font-bold mb-2">{new Date(selectedLetter.created_at).toDateString()}</span>
		<span><b class="mr-2">Letter:</b>{selectedLetter.letter}</span>
		<span class="flex flex-row"><b class="mr-2">Declared by:</b><img class="size-6 rounded"
																																		 src="https://zpi.zeus.gent/image/{selectedLetter.added_by.id}"
																																		 alt="profile">{selectedLetter.added_by.username}</span>
	</div>
{/if}

{#if user?.admin}
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

	<div class="border-2 p-3 border-gray-100 dark:border-zinc-700 rounded-lg">
		<span class="text-xl font-bold">Add Declarer</span>
		<form class="mt-2" method="POST">
			<div class="flex flex-row items-center mb-2">
				<label class="font-bold" for="id">Id: </label>
				<input class="ml-2 px-2 border-gray-100 dark:border-zinc-700 border-2 rounded w-full" name="id"
							 placeholder="id">
			</div>
			<div class="flex flex-row items-center mb-2">
				<label class="font-bold" for="username">Username: </label>
				<input class="ml-2 px-2 border-gray-100 dark:border-zinc-700 border-2 rounded w-full" name="username"
							 placeholder="username">
			</div>
			<button class="mt-2 bg-zoranje active:bg-orange-600 text-white w-full px-2 py-1 rounded" type="submit"
							formaction="/new_declarer">
				Add
			</button>
		</form>
	</div>
{/if}