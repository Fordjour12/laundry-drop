import Router from 'express'

const userRouter = Router()

userRouter.get('/user', (request, response, next) => {
	// eslint-disable-next-line no-console
	console.log('wello')
})
