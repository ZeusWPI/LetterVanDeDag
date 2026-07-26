import { addLetter } from '$lib/server/db';
import type { LetterVanDeDag, ZAuthUser } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';
import { env } from '$env/dynamic/private';
import { v4 as uuidv4 } from 'uuid';

export async function POST({ request, locals }): Promise<void> {
	const session = await locals.auth();
	if (session && (session.user as ZAuthUser)?.admin) {
		const data = await request.formData();

		const date = data.get('created_at') as string | null;
		const letter = data.get('letter') as string | null;
		const image = data.get('image') as File | null;
		const declarerId = data.get('declarer') as string | null;

		if (!date || !letter || !declarerId) {
			throw error(400, 'Not all required fields are present');
		}

		let imageUrl = null;
		if (image !== null && image.size > 0) {
			const uuid = uuidv4().replace(/-/g, '');
			const fileExtension = image.name.substring(image.name.lastIndexOf('.'));
			const filename = `${env.IMAGE_PATH}/${uuid}${fileExtension}`;
			await writeFile(filename, Buffer.from(await image?.arrayBuffer()));
			imageUrl = `/images/${uuid}${fileExtension}`;
		}

		const result: LetterVanDeDag = {
			letter: letter,
			created_at: date,
			added_by: {
				id: Number(declarerId)
			},
			imageUrl: imageUrl ? imageUrl : undefined
		};

		addLetter(result);

		throw redirect(303, '/');
	}
}
