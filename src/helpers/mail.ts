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

// const mail = new MailTransporter(
// 	String(process.env.MAILTRAP_TOKEN),
// 	'welcome there'
// )

// mail.sendMail('email setup', 'test@email.com', 'email-tester')
// class MailTransporter {
// 	token: string

// 	htmlMessage?: string

// 	constructor(token: string, htmlMessage: string) {
// 		this.token = token
// 		this.htmlMessage = htmlMessage
// 	}

// 	async sendMail(subject: string, recipientEmail: string, username: string) {
// 		const transport = createTransport(
// 			MailtrapTransport({
// 				token: this.token,
// 			})
// 		)
// 		try {
// 			transport.sendMail({
// 				to: {
// 					address: `${recipientEmail}`,
// 					name: `${username}`,
// 				},
// 				from: {
// 					address: String(process.env.MAILTRAP_SENDER_MAIL),
// 					name: 'Bobie Fordjour McCamble ',
// 				},
// 				subject,
// 				text: this.htmlMessage,
// 				// html: this.htmlMessage,
// 			})
// 		} catch (error) {
// 			if (error) throw new Error(`unable to send email ${error}`)
// 			// eslint-disable-next-line no-console
// 			console.error('emailError', error)
// 		}
// 	}
// }

export default transport
// export default MailTransporter
