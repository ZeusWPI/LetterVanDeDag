<script lang="ts">
	import type { Tick } from './Timeline.svelte';

	let { tick }: { tick: Tick } = $props();
</script>

<div
	class="pointer-events-none absolute top-full flex flex-col items-center"
	style="left: {tick.positionPct}%; transform: translateX(-50%);"
>
	<div class="w-1 bg-gray-400 dark:bg-zinc-600 {tick.isYear ? 'h-4' : 'h-2'}"></div>

	<span
		class="mt-1 text-[10px] whitespace-nowrap {tick.isYear
			? 'font-bold text-gray-800 dark:text-zinc-200'
			: 'text-gray-500 dark:text-zinc-400'}"
	>
		{tick.label}
	</span>
</div>
