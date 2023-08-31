import { Request, Response, Router } from 'express'
import { registerUserController } from './user.controller'

const userRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /api/v1/:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
userRouter.get('/', (request: Request, response: Response) => {
	response.json({
		message: 'welcome to the user routes',
	})
})

/**
 * @swagger
 * tags:
 *   name: Create users
 *   description: The creation of new user into the server
 * /api/v1/users:
 *   post:
 *     summary: Sends a list of Information about the user into the DB
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
userRouter.post('/create', registerUserController)

export default userRouter
