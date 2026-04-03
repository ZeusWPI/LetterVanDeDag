import { getDeclarers, getLeaderboard, getLetters, getStreaks } from '$lib/server/db';
import type { Declarer, LeaderboardUser, LetterVanDeDag, Streak } from '$lib/types';
import type { Session } from '@auth/sveltekit';

export type LoadReturn = {
	letters: {
		[day: string]: LetterVanDeDag;
	};
	session: Session | null;
	declarers: Declarer[];
	leaderboard_users: LeaderboardUser[];
	streaks: Streak[];
};

export const load = async (event): Promise<LoadReturn> => {
	const session = await event.locals.auth();

	const declarers = getDeclarers();

	const letter_list = getLetters();

	let letters: { [day: string]: LetterVanDeDag } = {};
	letter_list.forEach((l) => (letters[l.created_at] = l));

	let leaderboard_users = getLeaderboard();

	let streaks = getStreaks();

	return { letters, session, declarers, leaderboard_users, streaks };
};
