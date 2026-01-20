import { SvelteKitAuth } from '@auth/sveltekit';
import { env } from '$env/dynamic/private';
import type { ZAuthUser } from '$lib/types';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		{
			authorization: {
				params: { scope: 'roles' }
			},
			id: 'zauth',
			name: 'ZAuth',
			type: 'oauth',
			issuer: 'https://zauth.zeus.gent',
			clientId: env.ZAUTH_CLIENT_ID,
			clientSecret: env.ZAUTH_CLIENT_SECRET,
			token: 'https://zauth.zeus.gent/oauth/token',
			userinfo: 'https://zauth.zeus.gent/current_user',
			profile(profile): ZAuthUser {
				return {
					id: profile.id,
					zauthId: profile.id,
					username: profile.username,
					admin: profile.roles.includes('lettervandedag_manager') || profile.id == 391, // TODO: Remove
					picture: profile.picture
				};
			}
		}
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.user = user;
			return token;
		},
		async session({ session, token }) {
			session.user = token.user as any;
			return session;
		}
	}
});
