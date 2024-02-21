import prisma from '$lib/db';
import { hashPassword } from '$lib/helpers/bcrypt.helper';
import { generateRefreshToken } from '$lib/helpers/tokens.helper';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { registerFormSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerFormSchema))
	};
};

export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event, zod(registerFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password, name } = form.data;

		const registerCompany = await prisma.company.findUnique({
			where: {
				email: email
			},
			include: {
				cmpRefreshToken: true
			}
		});

		if (registerCompany) {
			return message(form, 'Email already exists');
		}
		const passHash = await hashPassword(password);

		const companyRefreshToken = await generateRefreshToken({
			email: email,
			name: name
		});

		console.log('rf tk >>:', companyRefreshToken);

		await prisma.company.create({
			data: {
				email: email,
				password: passHash,
				name: name,
				cmpRefreshToken: {
					create: {
						token: companyRefreshToken
					}
					// createMany: {
					// 	// token: companyRefreshToken
					// 	data: {
					// 		token: companyRefreshToken
					// 	}
					// }
				}
			}
		});

		return {
			form
			// registerCompany
		};
	}
};
