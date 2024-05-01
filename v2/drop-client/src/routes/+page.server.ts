import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {

    console.log('PageServerLoad =>', locals.session);

    const dt = locals.session;

    if (dt) {
        return {
            validSession: locals.session
        }
    }
    
    
};