import * as path from 'node:path';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import fs from 'node:fs/promises';
import mime from 'mime';

export const GET = async ({ params }) => {
	const pathName = path.resolve(env.IMAGE_PATH, params.path);

	if (isFileForbidden(pathName)) throw error(403);

	try {
		const file = await fs.readFile(pathName);
		const contentType = mime.getType(pathName) || 'application/octet-stream';
		return new Response(file, {
			headers: {
				'Content-Type': contentType
			}
		});
	} catch {
		throw error(404);
	}
};

function isFileForbidden(pathName: string) {
	return pathName.includes('../');
}
