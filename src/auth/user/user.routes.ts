import { NextFunction, Request, Response, Router } from 'express'

const userRouter = Router()

userRouter.get(
	'/',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(_request: Request, response: Response, _next: NextFunction) => {
		response.json({
			message: 'welcome to the users Route',
		})
	}
)

export default userRouter
