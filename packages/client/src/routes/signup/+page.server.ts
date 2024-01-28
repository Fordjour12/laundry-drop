import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	register: async ({ request, fetch }) => {
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

		// try {
		const response = await fetch('http://127.0.0.1:5000/auth/company/signup', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password, name })
		});

		const resData = await response.json();

		if (response.ok) {
			return { success: true, data: resData };
		}
		// return { data: resData };
	}

	// 	return {
	// 		status: 200,
	// 		body: {
	// 			invalid: true,
	// 			message: 'Invalid email or password'
	// 		}
	// 	};
	// const data = await request.formData();

	// const email = data.get('email');
	// const password = data.get('password');
	// const name = data.get('name');

	// console.log(email, password, name);
	// if (
	// 	typeof email !== 'string' ||
	// 	typeof password !== 'string' ||
	// 	typeof name !== 'string' ||
	// 	!email ||
	// 	!password ||
	// 	!name
	// ) {
	// 	return fail(400, { invalid: true, message: 'Invalid email or password' });
	// }

	// // try {
	// await fetch('http://127.0.0.1:5000/auth/company/signup', {
	// 	method: 'POST',
	// 	mode: 'cors',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify({ email, password, name })
	// });
	// }
} satisfies Actions;
