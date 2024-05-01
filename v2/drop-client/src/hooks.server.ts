import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => { 
    event.locals.session = "session";


    const resolving = await  resolve(event);
    return resolving;

}