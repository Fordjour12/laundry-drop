import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete('sessionId', { path: '/', httpOnly: true, sameSite: 'lax' });

	throw redirect(303, '/login');
};
