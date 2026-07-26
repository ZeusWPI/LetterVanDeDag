<script lang="ts">
	import UpdateDay from '$lib/components/UpdateDay.svelte';
	import AddDeclarer from '$lib/components/AddDeclarer.svelte';

	let { selectedLetter, selectedDate, user, declarers } = $props();


</script>

{#if selectedLetter}
	<div class="border-2  p-3 border-gray-100 dark:border-zinc-700 flex flex-col rounded-lg">
		<span class="text-xl font-bold mb-2">{new Date(selectedLetter.created_at).toDateString()}</span>
		<span><b class="mr-2">Letter:</b>{selectedLetter.letter}</span>
		<span class="flex flex-row"><b class="mr-2">Declared by:</b>
			<img class="size-6 rounded"
			     src="https://zpi.zeus.gent/image/{selectedLetter.added_by.id}"
			     alt="profile">{selectedLetter.added_by.username}</span>
	</div>
{/if}

{#if user?.admin}
	<UpdateDay {declarers} {selectedDate} />

	<AddDeclarer />
{/if}