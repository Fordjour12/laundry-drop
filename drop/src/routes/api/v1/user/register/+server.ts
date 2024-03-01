import prisma from '$lib/db';
import { hashPassword } from '$lib/helpers/bcrypt.helper';
import { generateAccessToken, generateRefreshToken } from '$lib/helpers/tokens.helper';
import { type RequestHandler } from '@sveltejs/kit';

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

	if (user) {
		return new Response(JSON.stringify({ message: 'User already exists' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			},
			statusText: 'Bad Request'
		});
	}
	const hashedPassword = await hashPassword(body.password);

	const createAccessToken = await generateAccessToken({
		email: body.email,
		username: body.username
	});
	const createdRefreshToken = await generateRefreshToken({
		email: body.email,
		username: body.username
	});

	const newCreateUser = await prisma.user.create({
		data: {
			username: body.username,
			email: body.email,
			password: hashedPassword,
			userRefreshToken: {
				create: {
					token: createdRefreshToken
				}
			}
		},
		select: {
			username: true,
			email: true,
			createdAt: true,
			updatedAt: true,
			userRefreshToken: {
				select: {
					token: true
				}
			}
		}
	});

	return new Response(
		JSON.stringify({
			message: 'Created',
			body: {
				...newCreateUser,
				accessToken: createAccessToken
			}
		}),
		{
			status: 201,
			headers: {
				'Content-Type': 'application/json'
			},
			statusText: 'Created'
		}
	);
};
