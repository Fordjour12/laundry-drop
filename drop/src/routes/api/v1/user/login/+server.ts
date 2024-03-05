import prisma from '$lib/db';
import { comparePassword } from '$lib/helpers/bcrypt.helper';
import { generateAccessToken } from '$lib/helpers/tokens.helper';
import type { RequestHandler } from '@sveltejs/kit';
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		},
		include: {
			userRefreshToken: true
		}
	});

	if (!user) {
		return new Response(JSON.stringify({ message: 'User does not exist' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			},
			statusText: 'Bad Request'
		});
	}
	const verifyPassword = await comparePassword(body.password, user.password);
	if (!verifyPassword) {
		return new Response(JSON.stringify({ message: 'Invalid Password or User' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			},
			statusText: 'Bad Request'
		});
	}

	const accessToken = await generateAccessToken({
		email: user.email,
		username: user.username,
		Id: user.id
	});

	return new Response(
		JSON.stringify({
			message: 'Successful',
			body: { ...user, accessToken }
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			statusText: 'OK'
		}
	);
};
