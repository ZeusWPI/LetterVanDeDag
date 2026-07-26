import { getLetters } from '$lib/server/db';
import type { LetterVanDeDag } from '$lib/types';
import type { Session } from '@auth/sveltekit';

export type LoadReturn = {
	letters: {
		[day: string]: LetterVanDeDag;
	};
	session: Session | null;
};

export const load = async (event): Promise<LoadReturn> => {
	const session = await event.locals.auth();

	const letter_list = getLetters();

	let letters: { [day: string]: LetterVanDeDag } = {};
	letter_list.forEach((l) => (letters[l.created_at] = l));

	return { letters, session };
};
