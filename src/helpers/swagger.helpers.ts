import swaggerJsDoc from 'swagger-jsdoc'

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Express API for Laundry Drop',
		version: '0.0.1',
		description:
			'This is a REST API application made with Express. It retrieves server data as an API.',
		license: {
			name: 'BSC',
			url: 'https://license.laundrydrop.in',
		},
		contact: {
			name: 'JSONPlaceholder',
			url: 'https://laundrydrop.in',
		},
	},

	// servers: [
	// 	{
	// 		url: `http://localhost:${process.env.API_PORT}`,
	// 		description: 'Development server',
	// 	},
	// ],
}

const options: swaggerJsDoc.Options = {
	swaggerDefinition,
	apis: ['./src/**/*.routes.ts'],
}

const swaggerSpecification = swaggerJsDoc(options)

export default swaggerSpecification
