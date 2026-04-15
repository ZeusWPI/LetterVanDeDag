<script lang="ts">
	import type { Declarer, Streak } from '$lib/types';
	import TickComponent from './Tick.svelte';
	import SegmentComponent from './Segment.svelte';
	import Tooltip from './Tooltip.svelte';

	let tooltipState = $state({
		segment: null as Segment | null,
		x: 0,
		y: 0,
		visible: false
	});

	function handleHover(segment: any, node: HTMLElement) {
		const rect = node.getBoundingClientRect();

		tooltipState = {
			segment,
			x: rect.left + rect.width / 2,
			y: rect.top,
			visible: true
		};
	}

	function handleLeave() {
		tooltipState.visible = false;
	}

	export type Segment = {
		isStreak: boolean;
		widthPct: number;
		days: number;
		user?: Declarer;
		color?: string;
		startDate?: Date;
		endDate?: Date;
	};

	export type Tick = { label: string; isYear: boolean; positionPct: number };

	const userColors = [
		'bg-zoranje',
		'bg-blue-500',
		'bg-green-500',
		'bg-purple-500',
		'bg-pink-500',
		'bg-teal-500',
		'bg-indigo-500',
		'bg-yellow-500',
		'bg-red-500'
	];

	function getColorForUser(id: number | undefined) {
		if (id === undefined) return '';
		return userColors[(id % 17) % userColors.length];
	}

	const MS_PER_DAY = 1000 * 60 * 60 * 24;
	// calculate the days between 2 dates
	// feb 1 and feb 2 is 1 day between
	export function daysBetween(start: Date, end: Date): number {
		return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
	}

	let { streaks }: { streaks: Streak[] } = $props();

	const timelineData = $derived.by(() => {
		if (!streaks || streaks.length === 0) return { segments: [], ticks: [], totalDays: 0 };

		// start the timeline at the first streak
		const timelineStart = streaks[0].start;
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

		const totalDays = Math.max(1, daysBetween(timelineStart, today) + 1);

		// make segments
		// a segment is a visual block on the timeline
		// either a streak, or a non-streak
		const segments: Segment[] = [];
		let currentPointer = timelineStart;

		for (const streak of streaks) {
			const streakStart = streak.start;
			const streakEnd = streak.end;

			if (streakStart > currentPointer) {
				// currentPointer is the last streak end
				const gapDays = daysBetween(currentPointer, streakStart);
				segments.push({
					isStreak: false,
					widthPct: (gapDays / totalDays) * 100,
					days: gapDays
				});
			}

			const streakDays = daysBetween(streakStart, streakEnd);
			const displayStreakEnd = structuredClone(streak.end);
			displayStreakEnd.setUTCDate(displayStreakEnd.getUTCDate() - 1); // damn js is ugly
			segments.push({
				isStreak: true,
				widthPct: (streakDays / totalDays) * 100,
				user: streak.user,
				days: streakDays,
				color: getColorForUser(streak.user?.id),
				startDate: streak.start,
				endDate: displayStreakEnd
			});

			currentPointer = streakEnd;
		}

		// ticks are the year/month markers under the timeline
		const ticks: Tick[] = [];

		// set the first tick on the first day of the following month
		let tickPointer = new Date(
			Date.UTC(timelineStart.getUTCFullYear(), timelineStart.getUTCMonth() + 1, 1)
		);

		while (tickPointer.getTime() < today.getTime()) {
			const diffDays = daysBetween(timelineStart, tickPointer);
			const positionPct = (diffDays / totalDays) * 100;

			// the label is the new year on jan 1st, or the short month on any other month
			const isYear = tickPointer.getUTCMonth() === 0; // 0 = january
			const label = isYear
				? tickPointer.getUTCFullYear().toString()
				: tickPointer.toLocaleDateString(undefined, { month: 'short', timeZone: 'UTC' });

			ticks.push({ label, isYear, positionPct });
			tickPointer.setUTCMonth(tickPointer.getUTCMonth() + 1);
		}

		return { segments, ticks, totalDays };
	});
</script>

<div
	class="pointer-events-none fixed z-100 flex -translate-x-1/2 -translate-y-full flex-col items-center pb-16 transition-opacity duration-200"
	style="left: {tooltipState.x}px; top: {tooltipState.y}px;
	    opacity: {tooltipState.visible ? 1 : 0};
		visibility: {tooltipState.visible ? 'visible' : 'hidden'}"
>
	{#if tooltipState.segment}
		<Tooltip segment={tooltipState.segment}></Tooltip>
	{/if}
</div>

<div class="mt-8 w-full rounded-lg border-2 border-gray-100 dark:border-zinc-700">
	<div class="relative p-4">
		<span class="text-xl font-bold">Timeline</span>
	</div>

	<!-- use rtl to start scrolling right, then set it back to ltr on the child element -->
	<div class="w-full overflow-x-auto px-4 pt-14 pb-12" dir="rtl">
		<div
			class="relative flex h-8 rounded-lg bg-zinc-200 dark:bg-zinc-900"
			dir="ltr"
			style="width: {Math.max(100, (timelineData.totalDays / 30) * 100)}%; min-width: 100%;"
		>
			{#each timelineData.segments as segment, i}
				<SegmentComponent
					{segment}
					isFirst={i === 0}
					isLast={segment.endDate?.toDateString() === new Date().toDateString()}
					onHover={handleHover}
					onLeave={handleLeave}
				></SegmentComponent>
			{/each}

			{#each timelineData.ticks as tick}
				<TickComponent {tick}></TickComponent>
			{/each}
		</div>
	</div>
</div>
