import type { Actions } from "@sveltejs/kit";
import { fail, superValidate, withFiles } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { serviceFormSchema } from "./schema";

export const load: PageServerLoad = async (event) => {
    return {
        form: await superValidate(zod(serviceFormSchema))
    };
}

export const actions: Actions = {
    default: async ({ request, fetch }) => {
        const form = await superValidate(request, zod(serviceFormSchema));
        if (!form.valid) {
            return fail(400, withFiles({ form }))
        }

        const { description, image, name, price } = form.data

        console.log("form data:", form.data)

        // const _id = 1
        // const response = await fetch(`localhost:8080/api/v1/create-new-service/${_id}`, {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     },
        //     body: JSON.stringify({ description, name, price })
        // })

        // if (!response.ok) {
        //     const data = await response.json()
        //     return fail(400, {
        //         message: data.message,
        //         form
        //     })
        // }

        return withFiles({ form })
    }

};