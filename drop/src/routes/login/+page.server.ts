import { Session } from "$lib/helpers/session.helper";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { loginFormSchema } from "./schema";

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get(Session);

	if (sessionId) {
		redirect(301, "/dashboard");
	}
	return {
		form: await superValidate(zod(loginFormSchema)),
	};
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		event.cookies.set(Session, "123", {
			path: "/",
		})
		redirect(303, "/dashboard");


		// const company = await prisma.company.findUnique({
		// 	where: {
		// 		email: email
		// 	},
		// 	select: {
		// 		id: true,
		// 		name: true,
		// 		email: true,
		// 		password: true
		// 	}
		// });

		// if (!company) {
		// 	return message(form, 'Email does not exist', {
		// 		status: 400
		// 	});
		// }

		// const validatePassword = await comparePassword(password, String(company?.password));
		// if (!validatePassword) {
		// 	return message(form, 'Password does not exist', {
		// 		status: 400
		// 	});
		// }
		// console.log(validatePassword);

		// const accessToken = await generateAccessToken({
		// 	id: company.id,
		// 	name: company.name,
		// 	email: company.email
		// });

		// event.cookies.set(Session, accessToken, {
		// 	path: '/',
		// 	maxAge: 60 * 15,
		// 	sameSite: 'lax',
		// 	httpOnly: true
		// 	// secure: true // for production
		// });

		// console.log(accessToken, { ...company });

		// redirect(303, '/dashboard');

		// // return {
		// // form
		// // };
	},
};
