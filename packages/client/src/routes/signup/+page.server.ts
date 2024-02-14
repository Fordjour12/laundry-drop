import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('sessionId');

	if (sessionId) {
		return redirect(301, '/dashboard');
	}
};

export const actions = {
	register: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');
		const name = data.get('name');

		console.log(email, password, name);
		if (
			typeof email !== 'string' ||
			typeof password !== 'string' ||
			typeof name !== 'string' ||
			!email ||
			!password ||
			!name
		) {
			return fail(400, { invalid: true, message: 'Invalid email or password' });
		}

		const response = await fetch('http://127.0.0.1:5000/auth/company/signup', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password, name })
		});

		if (response.ok) {
			const sessionId = response.headers.get('Authorization');
			console.log(sessionId);
			cookies.set('sessionId', sessionId?.split('Bearer ')[1] ?? '', {
				path: '/',
				httpOnly: true,
				sameSite: 'lax'
			});

			throw redirect(301, '/dashboard');
		} else {
			const data = await response.json();
			return fail(response.status, data);
		}
	}
} satisfies Actions;
