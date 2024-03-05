import prisma from '$lib/db';
import { comparePassword } from '$lib/helpers/bcrypt.helper';
import { generateAccessToken } from '$lib/helpers/tokens.helper';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { email, password } = body;

	const user = await prisma.user.findUnique({
		where: {
			email
		}
	});

	if (!user) {
		return new Response(
			JSON.stringify({
				message: 'User not found'
			}),
			{
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				},
				statusText: 'Not Found'
			}
		);
	}

	const isPasswordValid = await comparePassword(password, user.password);

	if (!isPasswordValid) {
		return new Response(
			JSON.stringify({
				message: 'User not found'
			}),
			{
				status: 401,
				headers: {
					'Content-Type': 'application/json'
				},
				statusText: 'Unauthorized'
			}
		);
	}

	const accessToken = await generateAccessToken({
		id: user.id,
		email: user.email,
		username: user.username
	});

	return new Response(
		JSON.stringify({
			...user,
			accessToken
		}),
		{
			status: 200,
			statusText: 'OK',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};
