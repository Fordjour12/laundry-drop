// import { MailtrapClient } from 'mailtrap'

// /**
//  * For this example to work, you need to set up a sending domain,
//  * and obtain a token that is authorized to send from the domain.
//  */

// const TOKEN = 'f18d0e7e79c3c6febd4f6ea048e6cda1'
// const SENDER_EMAIL = 'fordjourbobiem@gmail.com'
// const RECIPIENT_EMAIL = '<RECIPIENT@EMAIL.COM>'

// const client = new MailtrapClient({ token: TOKEN })

// const sender = { name: 'Mailtrap Test', email: SENDER_EMAIL }

// export { client, sender }

import * as nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
	host: process.env.NODE_MAILER_HOST,
	port: Number(process.env.NODE_MAILER_PORT),
	auth: {
		user: process.env.NODE_MAILER_USER,
		pass: process.env.NODE_MAILER_PASSWORD,
	},
})

export default transport
