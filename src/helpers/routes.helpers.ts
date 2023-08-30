import { Request, Response, Router } from 'express'
import laundryProviderRouter from '../auth/laundry-provider/user.routes.js'
import userRouter from '../auth/user/user.routes.js'

const ApiRoutes = Router()
ApiRoutes.get('/', (_request: Request, response: Response) => {
	response.json({
		message: 'Welcome to api version 1',
	})
})

ApiRoutes.use('/user', userRouter)
ApiRoutes.use('/provider', laundryProviderRouter)

export default ApiRoutes
