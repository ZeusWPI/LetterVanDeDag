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


	const disabledClasses = {
		button: 'border-gray-200 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-700',
		text: 'text-zinc-400'
	};
	const activeClasses = {
		button: 'border-orange-200 dark:border-orange-400 bg-orange-50 dark:bg-orange-500/35',
		text: 'text-orange-700 dark:text-orange-50 font-bold'
	};
	const normalClasses = {
		button: 'border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-800',
		text: 'text-gray-400'
	};

</script>

<button onclick={onclick}
				class="aspect-square  border-1 rounded  relative cursor-default {disabled?disabledClasses.button:active?activeClasses.button:normalClasses.button}">
		<span
			class="absolute left-2 {disabled?disabledClasses.text:active?activeClasses.text:normalClasses.text}">{dayNum}</span>
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