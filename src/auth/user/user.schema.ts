import { TypeOf, z } from 'zod'

enum Accountvalidataion {
	NOT_VALID,
	VALID,
}

const createUserSchema = z.object({
	username: z.coerce
		.string({ required_error: 'username is required' })
		.min(3),
	email: z.coerce
		.string({
			required_error: 'Email Address is required ',
		})
		.email(),
	password: z.coerce
		.string({ required_error: 'password is required' })
		.min(8, 'must be at least 8 characters')
		.max(32, 'must be at most 32  characters'),
	phoneNumber: z.coerce
		.number({ required_error: 'Phone number is required' })
		.min(10, 'must be exact 10 numbers ')
		.max(10, 'must be exact 10 numbers'),
	account_state: z.optional(z.nativeEnum(Accountvalidataion)),
})

const signInUserSchema = z.object({})

export type CreateUserInput = TypeOf<typeof createUserSchema>

export { createUserSchema, signInUserSchema }
