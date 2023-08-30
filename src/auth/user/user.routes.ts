import { Request, Response, Router } from 'express'

const userRouter = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

userRouter.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'welcome to the user routes',
	})
})

export default userRouter
