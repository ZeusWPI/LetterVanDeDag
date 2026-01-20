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

	const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });


	const disabledClasses = {
		button: 'border-gray-200 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-700',
		text: 'text-zinc-400'
	};
	const activeClasses = {
		button: 'border-3 border-orange-200 dark:border-orange-400 bg-orange-50 dark:bg-orange-500/35',
		text: 'text-orange-700 dark:text-orange-50 font-bold'
	};
	const normalClasses = {
		button: 'border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-800',
		text: 'text-gray-400'
	};

	let textClasses = $derived(disabled ? disabledClasses.text : active ? activeClasses.text : normalClasses.text);
	let buttonClasses = $derived(disabled ? disabledClasses.button : active ? activeClasses.button : normalClasses.button);

	let letterLength = $derived([...segmenter.segment(letterData?.letter)].length);

</script>

<button onclick={onclick}
				class="aspect-square  border-1 rounded  relative cursor-default {buttonClasses}">
		<span
			class="absolute left-2 text-xs md:text-md {textClasses}">{dayNum}</span>
	<span
		class="flex items-center justify-center h-full w-full {letterLength<2?'text-3xl md:text-6xl':'text-xs md:text-md ' + (letterLength<10? 'lg:text-xl':'')}">
			{#if letterData?.imageUrl}
				<img class="max-h-4/6 max-w-4/6" src={letterData.imageUrl} alt={letterData.letter} />
			{:else}
				{letterData ? letterData.letter : ""}
			{/if}</span>
	{#if letterData != null}
		<img class="hidden md:block size-8 lg:size-6 absolute rounded bottom-1 right-1"
				 src="https://zpi.zeus.gent/image/{letterData.added_by.id}"
				 alt="{letterData.added_by.username}"
				 title="Declared by {letterData.added_by.username}" />
	{/if}
</button>