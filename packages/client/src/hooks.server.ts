import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.session = event.cookies.get('sessionId')!;
	event.locals.company = event.locals.session
		? { name: 'Acme Inc', email: 'Acmelnd@laundryservices.com' }
		: null;

	if (event.url.pathname.startsWith('/dashboard')) {
		if (!event.locals.session) {
			throw redirect(303, '/login');
		}
	}

	const rs = await resolve(event);

	return rs;
};
