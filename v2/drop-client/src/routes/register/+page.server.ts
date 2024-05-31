import { env } from "$env/dynamic/private";
import { fail, redirect, error } from "@sveltejs/kit";
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

export const actions = {
	register: async (event) => {
		const form = await superValidate(event, zod(registerFormSchema));
		if (!form.valid) {
			return fail(400, {

				form,
			});
		}

		const { email, password, name } = form.data;
		console.log(env.DEPLOYMENT_API_URL);
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
			const data = await response.json();
			error(404, {
				message: data.message,
			});
		}

		return redirect(301, "/login");

	}
} satisfies Actions;
