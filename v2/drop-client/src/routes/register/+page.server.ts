import { env } from "$env/dynamic/private";
//import prisma from '$lib/db';
//import { hashPassword } from '$lib/helpers/bcrypt.helper';
//import { Session } from '$lib/helpers/session.helper';
//import { generateAccessToken, generateRefreshToken } from '$lib/helpers/tokens.helper';
// message => superValidate => zod => registerFormSchema
import { fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { registerFormSchema } from "./schema";

export const load: PageServerLoad = async () => {
	// validate if session has not expired
	// const sessionId = cookies.get(Session)

	// if (sessionId) {
	// 	return redirect(301, "/dashboard")
	// }

	return {
		form: await superValidate(zod(registerFormSchema)),
	};
};

export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event, zod(registerFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const { email, password, name } = form.data;
		console.log(env.DEPLOYMENT_API_URL);
		try {
			const response = await event.fetch(
				"http://localhost:8080/api/v1/create-company",
				{
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password, name }),
				},
			);

			if (!response.ok) {
				// throw new Error("Failed to register company");

				const data = await response.json();
			}

			const data = await response.json();
			return { data };
		} catch (error) {
			console.log(error);
			return message(form, error, {
				status: 500,
			});
		}
	},
};
//		const { email, password, name } = form.data;
//
//		const registerCompany = await prisma.company.findUnique({
//			where: {
//				email: email
//			},
//			include: {
//				cmpRefreshToken: true
//			}
//		});
//
//		if (registerCompany) {
//			return message(form, 'Email already exists', {
//				status: 400
//			});
//		}
//		const passHash = await hashPassword(password);
//
//		const companyRefreshToken = await generateRefreshToken({
//			email: email,
//			name: name
//		});
//
//		const registeredCompany = await prisma.company.create({
//			data: {
//				email: email,
//				password: passHash,
//				name: name,
//				cmpRefreshToken: {
//					create: {
//						token: companyRefreshToken
//					}
//					// TODO: will have to look more into this
//					// createMany: {
//					// 	// token: companyRefreshToken
//					// 	data: {
//					// 		token: companyRefreshToken
//					// 	}
//					// }
//				}
//			}
//		});
//
//		const accessToken = await generateAccessToken({
//			email: registeredCompany.email,
//			name: registeredCompany.name,
//			id: registeredCompany.id
//		});
//
//		event.cookies.set(Session, accessToken, {
//			path: '/',
//			maxAge: 60 * 15,
//			sameSite: 'lax',
//			httpOnly: true
//			// secure: true // for production
//		});
//
//		redirect(303, '/dashboard');
//
//		/**
//		 *  unreachable code
//		 * */
//		// return {
//		// form
//		// };
//	}
//};
