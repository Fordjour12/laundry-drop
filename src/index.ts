import compression from 'compression'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

//  import router files
import userRouter from './auth/user/user.routes.js'

dotenv.config({ path: './.env' })

const app = express()

app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(cors())

app.use(express.json())

const port = Number(process.env.API_PORT) || 5000

app.use('/api/v1/user', userRouter)

function notFound(req: Request, res: Response, next: NextFunction) {
	res.status(404)
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
	next(error)
}

app.use(notFound)

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Hello form server ${port}`)
})

export default app
