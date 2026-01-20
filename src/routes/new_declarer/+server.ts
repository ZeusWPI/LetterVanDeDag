import { addDeclarer } from '$lib/server/db';
import type { Declarer, ZAuthUser } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';

export async function POST({ request, locals }): Promise<void> {
	const session = await locals.auth();
	if (session && (session.user as ZAuthUser)?.admin) {
		const data = await request.formData();
		console.log(data);

		const id = data.get('id') as string | null;
		const username = data.get('username') as string | null;

		if (!id || !username) {
			throw error(400, 'Not all required fields are present');
		}

		const result: Declarer = {
			id: Number(id),
			username: username
		};

		addDeclarer(result);

		throw redirect(303, '/');
	}
}
