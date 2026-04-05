<script lang="ts">
	import type { Segment } from './Timeline.svelte';

	let { segment }: { segment: Segment } = $props();

	function formatDate(date: Date | undefined): string {
		return date === undefined
			? ''
			: date.toLocaleDateString(undefined, {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				});
	}
</script>

<div
	class="flex flex-col items-center gap-1 rounded bg-gray-900 px-3 py-2 text-xs text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
>
	<span class="text-sm font-bold">{segment.user?.username}</span>
	{#if segment.startDate?.getTime() === segment.endDate?.getTime()}
		<span class="opacity-90">{formatDate(segment.startDate)}</span>
	{:else}
		<span class="opacity-90">{formatDate(segment.startDate)} — {formatDate(segment.endDate)}</span>
	{/if}
	<span class="font-mono text-[10px] opacity-75"
		>{segment.days} {segment.days === 1 ? 'day' : 'days'}</span
	>
</div>
<div class="-mt-1 h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-100"></div>
