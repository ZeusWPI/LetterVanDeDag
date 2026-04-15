<script lang="ts">
	import type { Segment } from './Timeline.svelte';
	import Tooltip from './Tooltip.svelte';

	let { segment, onHover, onLeave } = $props();
</script>

{#if segment.isStreak}
	<div
		class="relative h-full {segment.color} group cursor-pointer border-r-2 border-zinc-200 transition-all hover:brightness-110 dark:border-zinc-800"
		style="width: {segment.widthPct}%"
		onpointerenter={(e) => onHover(segment, e.currentTarget)}
		onpointerleave={onLeave}
		role="tooltip"
	>
		<div class="absolute -top-12 left-1/2 flex -translate-x-1/2 flex-col items-center">
			<!-- avatar -->
			<img
				src="https://zpi.zeus.gent/image/{segment.user?.id}"
				alt={segment.user?.username}
				class="relative size-8 max-w-none min-w-8 shrink-0 rounded-full border-2 border-white bg-white shadow-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-125 dark:border-zinc-700"
			/>
			<div class="mt-1 h-3 w-0.5 bg-gray-400 dark:bg-zinc-500"></div>
		</div>
	</div>
{:else}
	<div
		class="h-full border-r border-gray-300/30 dark:border-zinc-700/30"
		style="width: {segment.widthPct}%"
	></div>
{/if}
