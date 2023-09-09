import { Request, Response, Router } from 'express'
import { registerLaundryProviderController } from './laundryProvider.controller'

const laundryProviderRouter = Router()

laundryProviderRouter.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'welcome to the provider Route',
	})
})

laundryProviderRouter.post('/create', registerLaundryProviderController)

export default laundryProviderRouter
