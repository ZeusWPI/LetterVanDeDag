import db, { addLetter, getDeclarers, getLetters } from '$lib/server/db';
import type { LetterVanDeDag, Declarer, ZAuthUser } from '$lib/types';

export const load = async (event) => {
	const session = await event.locals.auth();

	const declarers = getDeclarers();
	console.log(declarers);

	const letter_list = getLetters();

	let letters: { [day: string]: LetterVanDeDag } = {};
	letter_list.forEach((l) => (letters[l.created_at.toDateString()] = l));

	return { letters, session, declarers };
};
