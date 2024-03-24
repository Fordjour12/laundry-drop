import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	console.log('session >>', locals.session);

	if (url.pathname.startsWith('/')) {
		if (locals.session) {
			redirect(303, '/dashboard');
		}
	}
};
