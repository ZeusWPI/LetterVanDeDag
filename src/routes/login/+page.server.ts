import { signIn } from '$lib/server/auth';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
export const actions: Actions = { default: signIn };

export const load = async ({ locals }) => {
	const session = await locals.auth();
	if (session) {
		throw redirect(303, '/'); // redirect logged-in users
	}
	return {};
};
