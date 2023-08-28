import { NextFunction, Request, Response } from 'express'
import { FindUserByEmail } from '../services/user.service.js'
i

const createUserController = async (
	request: Request<{}, {},>,
	response: Response,
	next: NextFunction
) => {
	const user = FindUserByEmail()
}
