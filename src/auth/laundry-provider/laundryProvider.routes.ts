import { Request, Response, Router } from 'express'
import {
	registerLaundryProviderController,
	signInLaundryProviderController,
	signOutLaundryProviderController,
} from './laundryProvider.controller'

const laundryProviderRouter = Router()

laundryProviderRouter.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'welcome to the provider Route',
	})
})

laundryProviderRouter.post('/create', registerLaundryProviderController)

laundryProviderRouter.post('/signin', signInLaundryProviderController)

laundryProviderRouter.delete('/logout', signOutLaundryProviderController)

export default laundryProviderRouter
