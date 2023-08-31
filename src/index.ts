import compression from 'compression'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'

import { notFound } from './helpers/root.middleware.helpers'
import ApiRoutes from './helpers/routes.helpers'
import swaggerSpecification from './helpers/swagger.helpers'

dotenv.config({ path: './src/.env' })

dotenv.config({ path: './.env' })

const app = express()

app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (_request: Request, response: Response) => {
	response.json({
		message: 'Welcome to the development server Laundry Drop',
	})
})

app.use('/api/v1', ApiRoutes)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification))

const port = Number(process.env.API_PORT) || 5000

app.use(notFound)

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Hello form server ${port}`)
})

export default app
