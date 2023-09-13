// import * as nodemailer from 'nodemailer'

// import { MailtrapTransport } from 'mailtrap'
import { createTransport } from 'nodemailer'

const transport = createTransport({
	host: process.env.NODE_MAILER_HOST,
	port: Number(process.env.NODE_MAILER_PORT),
	auth: {
		user: process.env.NODE_MAILER_USER,
		pass: process.env.NODE_MAILER_PASSWORD,
	},
})

export default transport
