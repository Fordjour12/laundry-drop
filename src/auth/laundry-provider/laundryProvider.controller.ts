/* eslint-disable @typescript-eslint/no-shadow */
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { error } from 'console'
import { NextFunction, Request, Response } from 'express'
import { signJWT } from '../../helpers/jwt'
import sendEmailToUser from '../../mail/mail.service'
import { RegisterLaundryProviderSchemaType } from './laundryProvider.schema'
import {
	createLaundryProvider,
	findLaundryProviderByEmail,
} from './laundryProvider.service'

const registerLaundryProviderController = async (
	request: Request<
		NonNullable<unknown>,
		NonNullable<unknown>,
		RegisterLaundryProviderSchemaType
	>,
	response: Response,
	next: NextFunction
	// eslint-disable-next-line consistent-return
) => {
	try {
		const { email, name, password, priceRange } = request.body

		const saltRounds = Number(process.env.BCRYPT_SALT_ROUND)
		const salt = await bcrypt.genSalt(saltRounds)

		const hashedPassword = await bcrypt.hash(password, salt)

		const laundryProviderInfo = await createLaundryProvider({
			email,
			name,
			password: hashedPassword,
			priceRange: Number(priceRange),
		})

		sendEmailToUser({
			ToEmail: email,
			FromEmail: String(process.env.SENDER_MAIL),
			MailSubject: 'WELCOME TO THE MAIL',
			HTML: `
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Email Verification</title>
				</head>
				<body>
					<div>
						<h1>Hello ${email}</h1>
						<p> You registered an account on Laundry Drop, before being able to use your account you need to verify that this is your email address by clicking here:
							<span class="block">
								<a href="">verify email address</a>
							</span>
						</p>

						<div>
							<p>Kind Regards,</p>
							<span>Laundry Drop</span>
							<small>support@laundrydrop.com</small>
						</div>
					</div>

					<center>
					<small style="display: block"> location data </small>
					<small style="display: block"> location data </small>
					<small style="display: block"> country </small>
					</center>
				</body>
		 	</html>
			`,
		})

		response.status(201).json({
			status: 'success',
			data: {
				laundryProviderInfo,
			},
		})
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return response.status(409).json({
					status: 'failure',
					message: 'user exist sign in instead',
				})
			}
		}

		// eslint-disable-next-line no-console
		console.log('Error', error)
		next(error)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const signInLaundryProviderController = async (
	request: Request,
	response: Response,
	next: NextFunction
	// eslint-disable-next-line consistent-return
) => {
	/**
	 * 		TODO:
	 * 	check db if user exist
	 *  if user exits login him in
	 *  jsonwebtoken (access token and Refresh token)
	 * sign user into an access token and refersh token
	 * */
	try {
		const { email, password } = request.body

		const laundryProviderInfo = await findLaundryProviderByEmail(
			{
				email,
			},
			{
				name: true,
				priceRange: true,
				id: true,
				password: true,
				email: true,
				accountState: true,
			}
		)

		const passwordValidity = await bcrypt.compare(
			password,
			laundryProviderInfo.password
		)

		if (!laundryProviderInfo || !passwordValidity) {
			return response
				.status(401)
				.send('Invalid user information try again instead')
		}
		const accessToken = signJWT(
			{
				name: laundryProviderInfo.name,
				id: laundryProviderInfo.id,
			},
			'1h'
		)

		console.info(accessToken)

		// response.cookie('atk', accessToken)

		response.status(200).json({
			status: 'success',
			data: { ...laundryProviderInfo },
			accessToken,
		})
	} catch (error) {
		console.error('Error', error)
		next(error)
	}
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signOutLaundryProviderController = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	/**
	 *  TODO:
	 * 	check user
	 * Delete user jsonwebtoken
	 * After token been deleted user is logged out
	 * */
	response.status(200).send({
		done: 'done',
	})
	if (error) {
		next(error)
	}
}

export {
	registerLaundryProviderController,
	signInLaundryProviderController,
	signOutLaundryProviderController,
}
