import { TypeOf, z } from 'zod'

enum AccountValidation {
	NOT_VALID,
	VALID,
}

const registerUserSchema = z.object({
	body: z.object({
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
			.string({ required_error: 'Phone number is required' })
			.min(10, 'must be exact 10 numbers ')
			.max(10, 'must be exact 10 numbers'),
		account_state: z.optional(z.nativeEnum(AccountValidation)),
	}),
})
const signInUserSchema = z.object({})

export type CreateUserInputType = Omit<
	TypeOf<typeof registerUserSchema>['body'],
	'account_state'
>

export { registerUserSchema, signInUserSchema }
