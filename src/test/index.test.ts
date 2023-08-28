import supertest from 'supertest'
import app from '../index.js'

describe('Get root path /', () => {
	test('hit root endpoint', async () => {
		supertest(app)
			.get('/')
			.set('Accept', 'application/json')
			.expect('Content-Type', '/json/')
			// eslint-disable-next-line no-console
			.expect(200, console.log('hell007'))
	})
})
