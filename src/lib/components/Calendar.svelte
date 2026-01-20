<script lang="ts">
	import { daysInMonth, getFirstWeekNextMonth, getLastWeekPreviousMonth, MONTHS, WEEKDAYS } from '$lib/util';
	import CalendarDay from '$lib/components/CalendarDay.svelte';
	import Icon from '@iconify/svelte';

	let { letterData, selectedDate = $bindable() } = $props();

	const lastMonth = $derived(getLastWeekPreviousMonth(selectedDate));
	const currentMonth = $derived(Array.from({ length: daysInMonth(selectedDate) }, (v, i) => i + 1));
	const nextMonth = $derived(getFirstWeekNextMonth(selectedDate));

	let dropdownMonth = $derived(selectedDate.getMonth());
	let dropdownYear = $derived(selectedDate.getFullYear());

	function selectFromDropdown(event: Event) {
		selectedDate = new Date(dropdownYear, dropdownMonth, selectedDate.getDate());
	}

	function getDropdownYears() {
		const newestDate = new Date();
		const oldestDate = new Date(2024, 0, 0);
		const amount = newestDate.getFullYear() + 1 - oldestDate.getFullYear();
		return Array.from(Array(amount).keys()).map(i => i + oldestDate.getFullYear() + 1);
	}

	function dateFromRelativeDay(day: number, relativeMonth: number) {
		let year = selectedDate.getFullYear();
		let month = selectedDate.getMonth();
		if (relativeMonth == -1) {
			year = month == 0 ? year - 1 : year;
			month = (11 + month) % 12;
		} else if (relativeMonth == 1) {
			year = month == 11 ? year + 1 : year;
			month = (month + 1) % 12;
		}

		return new Date(year, month, day);
	}

	function selectDay(day: number, relativeMonth: number) {
		selectedDate = dateFromRelativeDay(day, relativeMonth);
	}

	function getLetterData(day: number, relativeMonth: number) {
		const date = dateFromRelativeDay(day, relativeMonth);
		return Object.keys(letterData).includes(date.toDateString()) ? letterData[date.toDateString()] : null;
	}
</script>
<span class="px-5 mb-2 flex flex-row justify-between items-center">
	<span>
		<button class="text-xl mr-3 active:bg-gray-100 py-2 px-2 rounded-full"
						onclick={()=> selectDay(selectedDate.getDate(), -1)}
		><Icon icon="material-symbols:arrow-back-ios-new-rounded" /></button>
		<button class="text-xl active:bg-gray-100 py-2 px-2 rounded-full"
						onclick={()=> selectDay(selectedDate.getDate(), 1)}>
			<Icon icon="material-symbols:arrow-forward-ios-rounded" /></button>
	</span>
	<span>
	<select class="mx-1 px-2 rounded-lg border-gray-200 border-3"
					bind:value={dropdownMonth} onchange={selectFromDropdown}>
			{#each MONTHS as month, i}
				<option value={i}>{month}</option>
			{/each}
		</select>
		<select class="mx-1 px-2 rounded-lg border-gray-200 border-3"
						bind:value={dropdownYear} onchange={selectFromDropdown}>
			{#each getDropdownYears() as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
		</span>
</span>
<div class="grid grid-cols-7">
	{#each WEEKDAYS as weekday}
		<span class="text-center font-bold w-full pb-1">{weekday}</span>
	{/each}
	{#if lastMonth.dates.length < 7}
		{#each lastMonth.dates as day}
			<CalendarDay
				disabled
				dayNum={day}
				letterData={getLetterData(day, -1)}
				onclick={() => selectDay(day, -1)} />
		{/each}
	{/if}

	{#each currentMonth as day}
		<CalendarDay
			dayNum={day}
			active={selectedDate.getDate()===day}
			onclick={() => selectDay(day, 0)}
			letterData={getLetterData(day, 0)}
		/>
	{/each}

	{#if nextMonth.dates.length < 7}
		{#each nextMonth.dates as day}
			<CalendarDay
				disabled
				dayNum={day}
				letterData={getLetterData(day, 1)}
				onclick={() => selectDay(day, 1)} />
		{/each}
	{/if}
</div>