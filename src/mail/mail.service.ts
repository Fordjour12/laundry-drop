import { response } from 'express'
import { createTransport } from 'nodemailer'

type SendEmail = {
	ToEmail: string
	FromEmail: string
	MailSubject: string
	HTML?: string
	TEXT?: string
}

const sendEmailToUser = ({
	ToEmail,
	FromEmail,
	MailSubject,
	TEXT,
	HTML,
}: SendEmail) => {
	const transport = createTransport({
		host: process.env.NODE_MAILER_HOST,
		port: Number(process.env.NODE_MAILER_PORT),
		auth: {
			user: process.env.NODE_MAILER_USER,
			pass: process.env.NODE_MAILER_PASS,
		},
	})

	transport.verify((error, success) => {
		if (error) {
			console.error(error)
		} else {
			console.info('mailing service is ready %s', success)
		}
	})

	transport.sendMail(
		{
			from: FromEmail,
			to: ToEmail,
			subject: MailSubject,
			text: TEXT,
			html: HTML,
		},
		(error, info) => {
			if (error) {
				// throw new Error(
				// 	`Couldn't Send Email Something Happened ${error}`
				// )
				console.log(error.message)
				response
					.status(500)
					.send(`Couldn't Send Email Something Happened ${error}`)
			}
			console.log('Message send :%s', info.messageId, info.response)
			response.send('Message sent')
		}
	)
}

export default sendEmailToUser
