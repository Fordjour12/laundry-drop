import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import process from 'process'
import sendEmailToUser from '../../mail/mail.service'
import { CreateUserInputType } from './user.schema'
import { createUserService } from './user.service'

const registerUserController = async (
	request: Request<
		NonNullable<unknown>,
		NonNullable<unknown>,
		CreateUserInputType
	>,
	response: Response,
	next: NextFunction
	// eslint-disable-next-line consistent-return
) => {
	try {
		const { username, email, password, phoneNumber } = request.body

		const saltRounds = Number(process.env.BCRYPT_SALT_ROUND)
		const salt = await bcrypt.genSalt(saltRounds)
		const hashedPassword = await bcrypt.hash(password, salt)

		const userInfo = await createUserService({
			username,
			email,
			password: hashedPassword,
			phoneNumber,
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
			data: userInfo,
		})
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return response.status(409).json({
					status: 'fail',
					message: 'user already exit',
				})
			}
		}
		// eslint-disable-next-line no-console
		console.error('error:', error)
		next(error)
	}
}

const signInUserController = (
	_request: Request,
	response: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction
) => {
	response.json({
		status: 'success',
		message: 'signInUser',
	})
}

const signOutUserController = (
	_request: Request,
	response: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction
) => {
	response.json({
		status: 'success',
		message: 'signOutUser',
	})
}
export { registerUserController, signInUserController, signOutUserController }
