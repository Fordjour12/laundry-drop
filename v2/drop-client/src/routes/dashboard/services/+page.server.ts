import { error, type Actions } from "@sveltejs/kit";
import { fail, superValidate, withFiles } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { serviceFormSchema } from "./schema";

type ServiceResponse = {
    id: number,
    name: string,
    description: string,
    price: number,
    image: string

}

export const load: PageServerLoad = async (event) => {
    const _id = 1
    const response = await event.fetch(`http://localhost:8080/api/v1/get-services/${_id}`)
    const services = await response.json()


    return {
        services,
        form: await superValidate(zod(serviceFormSchema))
    };
}

export const actions: Actions = {
    default: async ({ request, fetch }) => {
        const form = await superValidate(request, zod(serviceFormSchema));
        if (!form.valid) {
            return fail(400, withFiles({ form }))
        }

        let formData = new FormData()
        formData.append("name", form.data.name)
        formData.append("description", form.data.description)
        formData.append("image", form.data.image)
        formData.append("price", form.data.price.toString())

        const _id = 1
        const response = await fetch(
            `http://localhost:8080/api/v1/create-new-service/${_id}`, {
            method: "POST",
            mode: "cors",
            body: formData

        })

        if (!response.ok) {
            const data = await response.json()
            error(401, {
                message: data.message,
            })
        }

        return withFiles({ form })
    }

};