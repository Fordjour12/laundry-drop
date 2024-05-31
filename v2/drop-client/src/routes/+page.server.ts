import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const dt = locals.session;

    if (dt) {
        return {
            validSession: locals.session
        }
    }
};
