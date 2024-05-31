import { fail, error, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { loginFormSchema } from './schema';

export const load: PageServerLoad = async (event) => {
	console.log("login:", event.locals.session);

	return {
		form: await superValidate(zod(loginFormSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password } = form.data;

		const response = await event.fetch(
			"http://localhost:8080/api/v1/login-company", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password
			}),
		})


		if (!response.ok) {
			const data = await response.json()
			error(401, {
				message: data.message,
			});
		}

		const data = await response.json();
		//const cookie = env.DEPLOYMENT_API_SESSION_NAME;
		//console.log("cookies >", cookie, data.token);

		event.cookies.set("session", data.token, {
			maxAge: 60 * 60 * 24 * 7,
			path: "/",
			sameSite: "strict",
			httpOnly: true,
			secure: false
			// process.env.NODE_ENV === "production",

		})

		redirect(303, "/dashboard");

	}
} satisfies Actions;
