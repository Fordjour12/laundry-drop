import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');

		if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
			return fail(400, { invalid: true, message: 'Invalid email or password' });
		}

		const response = await fetch('http://127.0.0.1:5000/auth/company/signin', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		if (response.ok) {
			const sessionId = response.headers.get('Authorization');
			cookies.set('sessionId', sessionId?.split('Bearer ')[1] ?? '', { path: '/' });
		}
	}
} satisfies Actions;
