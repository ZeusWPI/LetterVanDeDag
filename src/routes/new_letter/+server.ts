import { addLetter, getImageLetterCount, getLetterByDay } from '$lib/server/db';
import type { LetterVanDeDag, ZAuthUser } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';
import { writeFile, unlink } from 'node:fs/promises';
import { env } from '$env/dynamic/private';
import { v4 as uuidv4 } from 'uuid';

export async function POST({ request, locals }): Promise<void> {
	const session = await locals.auth();
	if (!(session && (session.user as ZAuthUser)?.admin)) {
		return error(401, 'Unauthorized');
	}

	const data = await request.formData();

	const date = data.get('created_at') as string | null;
	const duplicate = (data.get('duplicate') as string | null) === 'true';
	const declarerId = data.get('declarer') as string | null;
	const originalDate = data.get('original-date') as string | null; // Should be yyyy-mm-dd

	let letter = data.get('letter') as string | null;
	const image = data.get('image') as File | null;

	let imageUrl: string | null = null;

	if (!duplicate) {
		if (!date || !letter || !declarerId) {
			throw error(400, 'Not all required fields are present');
		}

		if (image !== null && image.size > 0) {
			const uuid = uuidv4().replace(/-/g, '');
			const fileExtension = image.name.substring(image.name.lastIndexOf('.'));
			const filename = `${env.IMAGE_PATH}/${uuid}${fileExtension}`;
			await writeFile(filename, Buffer.from(await image?.arrayBuffer()));
			imageUrl = `/images/${uuid}${fileExtension}`;
		}
	} else {
		if (!date || !declarerId || !originalDate) {
			throw error(400, 'Not all required fields are present');
		}

		const originalLetter = getLetterByDay(originalDate);
		if (originalLetter == null) {
			throw error(400, 'Tried to add duplicate of day without letter');
		}
		letter = originalLetter.letter;
		imageUrl = originalLetter.imageUrl ? originalLetter.imageUrl : null;
	}

	const existingLetter = getLetterByDay(date);

	const result: LetterVanDeDag = {
		letter: letter,
		created_at: date,
		added_by: {
			id: Number(declarerId)
		},
		imageUrl: imageUrl ? imageUrl : undefined
	};

	addLetter(result);

	if (
		existingLetter &&
		existingLetter.imageUrl &&
		getImageLetterCount(existingLetter.imageUrl) === 0
	) {
		console.log(
			`Image ${existingLetter.imageUrl} has no references anymore and is being deleted.}`
		);
		const filename = `${env.IMAGE_PATH}/${existingLetter.imageUrl.substring('/images/'.length - 1)}`;
		await unlink(filename);
	}

	throw redirect(303, '/');
}
