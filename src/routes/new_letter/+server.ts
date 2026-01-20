import { addLetter } from '$lib/server/db';
import type { LetterVanDeDag, ZAuthUser } from '$lib/types';
import { error, invalid, redirect } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';

export async function POST({ request, locals }): Promise<void> {
	const session = await locals.auth();
	if (session && (session.user as ZAuthUser)?.admin) {
		const data = await request.formData();
		console.log(data);

		const date = data.get('created_at') as string | null;
		const letter = data.get('letter') as string | null;
		const image = data.get('image') as File | null;
		const declarerId = data.get('id') as string | null;
		const declarerName = data.get('declarer') as string | null;

		if (!date || !letter || !declarerId) {
			throw error(400, 'Not all required fields are present');
		}

		let imageUrl = null;
		if (image !== null && image.size > 0) {
			const filename = `static/images/${image.name}`;
			await writeFile(filename, Buffer.from(await image?.arrayBuffer()));
			imageUrl = `/images/${image.name}`;
		}

		const result: LetterVanDeDag = {
			letter: letter,
			created_at: new Date(date),
			added_by: {
				id: Number(declarerId),
				username: declarerName ? declarerName : undefined
			},
			imageUrl: imageUrl ? imageUrl : undefined
		};

		addLetter(result);

		throw redirect(303, '/');
	}
}

function cleanEmoji(letter: string) {
	return letter.replaceAll(':', '');
}
