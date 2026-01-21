export function getWeeksInMonth(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth();
	const weeks: number[][] = [],
		firstDate = new Date(year, month, 1),
		lastDate = new Date(year, month + 1, 0),
		numDays = lastDate.getDate();

	let dayOfWeekCounter = (6 + firstDate.getDay()) % 7;

	for (let date = 1; date <= numDays; date++) {
		if (dayOfWeekCounter === 0 || weeks.length === 0) {
			weeks.push([]);
		}
		weeks[weeks.length - 1].push(date);
		dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
	}

	return weeks
		.filter((w) => !!w.length)
		.map((w) => ({
			start: w[0],
			end: w[w.length - 1],
			dates: w
		}));
}

export function getLastWeekPreviousMonth(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth();
	const last_month = getWeeksInMonth(new Date(month == 0 ? year - 1 : year, (11 + month) % 12));
	return last_month[last_month.length - 1];
}
export function getFirstWeekNextMonth(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth();
	const next_month = getWeeksInMonth(new Date(month == 11 ? year + 1 : year, (month + 1) % 12));
	return next_month[0].end == 7 ? { start: 0, end: 0, dates: [] } : next_month[0];
}

export function daysInMonth(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth();
	const daysInMonths = [
		31,
		year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	return daysInMonths[month];
}

export const WEEKDAYS = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];
export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export function getISOString(selectedDate: Date) {
	selectedDate.setHours(12);
	return selectedDate.toISOString().substring(0, 10);
}
