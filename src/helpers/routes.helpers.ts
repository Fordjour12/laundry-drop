import { Router } from 'express'
import laundryProviderRouter from '../auth/laundry-provider/user.routes.js'
import userRouter from '../auth/user/user.routes.js'

const ApiRoutes = Router()

ApiRoutes.use('/user', userRouter)
ApiRoutes.use('/provider', laundryProviderRouter)

export default ApiRoutes
