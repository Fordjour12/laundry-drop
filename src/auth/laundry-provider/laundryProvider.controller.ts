import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import sendEmailToUser from '../../mail/mail.service'
import { RegisterLaundryProviderSchemaType } from './laundryProvider.schema'
import { createLaundryProvider } from './laundryProvider.service'

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
			data: laundryProviderInfo,
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
const signInLaundryProviderController = async (_params: never) => {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signOutLaundryProviderController = async (_params: never) => {}

export {
	registerLaundryProviderController,
	signInLaundryProviderController,
	signOutLaundryProviderController,
}
