import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import transport from '../../helpers/mail'
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
		const { email, name, password } = request.body

		const saltRounds = Number(process.env.BCRYPT_SALT_ROUND)
		const salt = await bcrypt.genSalt(saltRounds)

		const hashedPassword = await bcrypt.hash(password, salt)

		const laundryProviderInfo = await createLaundryProvider({
			email,
			name,
			password: hashedPassword,
			priceRange: 0,
		})

		transport.sendMail(
			{
				from: process.env.SENDER_MAIL,
				to: email,
				subject: 'thanks for signing up',
				text: 'thanks for signin up!!!',
			},

			(err) => {
				if (err) throw new Error(`unable to sendmail ${err}`)
				// eslint-disable-next-line no-console
				console.log('successfully sent mail')
			}
		)

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
