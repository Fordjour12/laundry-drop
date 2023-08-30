import { Request, Response, Router } from 'express'

const laundryProviderRouter = Router()

laundryProviderRouter.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'welcome to the provider Route',
	})
})

export default laundryProviderRouter
