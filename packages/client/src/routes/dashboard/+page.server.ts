import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async (event) => {
		// TODO: logout
		// remove the session_id cookie and redirect to /login

		const sessionId = event.cookies.get('sessionId');

		if (sessionId) {
			event.cookies.delete('sessionId', { path: '/', httpOnly: true, sameSite: 'lax' });
			redirect(301, '/login');
		}
	}
};
