import { Session } from "$lib/helpers/session.helper";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    console.log("hooks >>", event.cookies.get(Session))

    event.locals.session = event.cookies.get(Session);

    if (event.url.pathname.startsWith("/dashboard")) {
        if (!event.locals.session) {
            redirect(303, "/login")
        }
    }

    if (event.url.pathname.startsWith("/login") || event.url.pathname.startsWith("/register")) {
        if (event.locals.session) {
            redirect(303, "/dashboard")
        }

    }


    const rs = await resolve(event)

    return rs
}