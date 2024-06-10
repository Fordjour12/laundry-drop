import type { Actions } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { serviceFormSchema } from "./schema";

export const load: PageServerLoad = async (event) => {
    return {
        form: await superValidate(zod(serviceFormSchema))
    };
}

export const actions: Actions = {
    default: async (request) => {
        const form = await superValidate(request, zod(serviceFormSchema));
        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        return {
            form: await superValidate(zod(serviceFormSchema))
        }

    }

};