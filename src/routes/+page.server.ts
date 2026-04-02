import { getDeclarers, getLeaderboard, getLetters } from '$lib/server/db';
import type { Declarer, LeaderboardUser, LetterVanDeDag } from '$lib/types';
import type { Session } from '@auth/sveltekit';

type LoadReturn = {
	letters: {
		[day: string]: LetterVanDeDag;
	};
	session: Session | null;
	declarers: Declarer[];
	leaderboard_users: LeaderboardUser[];
};

export const load = async (event): Promise<LoadReturn> => {
	const session = await event.locals.auth();

	const declarers = getDeclarers();

	const letter_list = getLetters();

	let letters: { [day: string]: LetterVanDeDag } = {};
	letter_list.forEach((l) => (letters[l.created_at] = l));

	let leaderboard_users = getLeaderboard();

	return { letters, session, declarers, leaderboard_users };
};
