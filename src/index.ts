import compression from 'compression'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

dotenv.config({ path: './.env' })

const app = express()

app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(cors())

app.use(express.json())

const port = Number(process.env.API_PORT) || 5000

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Hello form server ${port}`)
})

export default app
