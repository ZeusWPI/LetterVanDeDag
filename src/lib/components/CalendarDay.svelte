<script lang="ts">
	import type { LetterVanDeDag } from '$lib/types';

	type ButtonClick = (
		event: MouseEvent & { currentTarget: HTMLButtonElement }
	) => void;
	let {
		dayNum, disabled = false, active = false, onclick = () => {
		}, letterData = null
	} = $props<{
		disabled?: boolean,
		active?: boolean,
		dayNum: number,
		onclick?: ButtonClick
		letterData?: LetterVanDeDag
	}>();
</script>

{#if disabled}
	<button onclick={onclick}
					class="aspect-square  border-1 rounded border-gray-200 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-700 relative cursor-default ">
		<span class="absolute left-2 text-zinc-400">{dayNum}</span>
		<span
			class="flex items-center justify-center h-full w-full md:text-2xl">
			{#if letterData?.imageUrl}
				<img class="max-h-4/6 max-w-4/6" src={letterData.imageUrl} alt={letterData.letter} />
			{:else}
				{letterData ? letterData.letter : ""}
			{/if}</span>
		{#if letterData != null}
			<img class="size-6 lg:size-10 absolute rounded bottom-1 right-1"
					 src="https://zpi.zeus.gent/image/{letterData.added_by.id}"
					 alt="{letterData.added_by.username}"
					 title="Declared by {letterData.added_by.username}" />
		{/if}
	</button>
{:else if active}
	<button onclick={onclick}
					class=" aspect-square border-3 rounded border-orange-200 dark:border-orange-400 bg-orange-50 dark:bg-orange-500/35 relative  cursor-default ">
		<span class="absolute left-2 text-orange-700 dark:text-orange-50 font-bold">{dayNum}</span>
		<span
			class="flex items-center justify-center h-full w-full md:text-2xl">
			{#if letterData?.imageUrl}
				<img class="max-h-4/6 max-w-4/6" src={letterData.imageUrl} alt={letterData.letter} title={letterData.letter} />
			{:else}
				{letterData ? letterData.letter : ""}
			{/if}
		</span>
		{#if letterData != null}
			<img class="size-6 lg:size-10 absolute rounded bottom-1 right-1"
					 src="https://zpi.zeus.gent/image/{letterData.added_by.id}"
					 alt="{letterData.added_by.username}"
					 title="Declared by {letterData.added_by.username}" />
		{/if}
	</button>
{:else}
	<button onclick={onclick}
					class="aspect-square  border-1 rounded border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 relative  cursor-default ">
		<span class="absolute left-2 text-gray-400">{dayNum}</span>
		<span
			class="flex items-center justify-center h-full w-full md:text-2xl">
			{#if letterData?.imageUrl}
				<img class="max-h-4/6 max-w-4/6" src={letterData.imageUrl} alt={letterData.letter} />
			{:else}
				{letterData ? letterData.letter : ""}
			{/if}</span>
		{#if letterData != null}
			<img class="size-6 lg:size-10 absolute rounded bottom-1 right-1"
					 src="https://zpi.zeus.gent/image/{letterData.added_by.id}"
					 alt="{letterData.added_by.username}"
					 title="Declared by {letterData.added_by.username}" />
		{/if}
	</button>
{/if}