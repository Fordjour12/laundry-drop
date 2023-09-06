import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import transport from '../../helpers/mail'
import prismaClient from '../../helpers/prisma.helpers'
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

		transport.sendMail(
			{
				from: process.env.MAILER_EMAIL,
				to: email,
				subject: 'thanks for signing up',
				text: 'thanks for signin up!!!',
			},

			(err) => {
				if (err) throw new Error(`unable to sendmail ${err}`)
				prismaClient.$disconnect()
				// eslint-disable-next-line no-console
				console.log('successfully sent mail')
			}
		)

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
	request: Request,
	response: Response,
	next: NextFunction
) => {
	response.json({
		status: 'sucess',
		message: 'signInUser',
	})
}

const signOutUserController = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	response.json({
		status: 'success',
		message: 'signOutUser',
	})
}
export { registerUserController, signInUserController, signOutUserController }
