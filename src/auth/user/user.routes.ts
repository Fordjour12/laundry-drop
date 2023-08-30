import { Request, Response, Router } from 'express'

const userRouter = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve the / route of users from laundry drop. Can be used to populate a list of fake users when prototyping or testing an API.
 */

userRouter.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'welcome to the user routes',
	})
})

export default userRouter
