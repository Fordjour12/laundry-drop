import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

	const getCookies = event.cookies.get("session");

	event.locals.session = getCookies;

	if (event.url.pathname.startsWith("/dashboard")) {
		if (!event.locals.session) {
			redirect(303, "/login");
		}
	}

	if (event.url.pathname.startsWith("/login") || event.url.pathname.startsWith("/register")) {
		if (event.locals.session) {
			redirect(303, "/dashboard");
		}
	}

	const resolving = await resolve(event);
	return resolving;

}
