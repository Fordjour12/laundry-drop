import { TypeOf, z } from 'zod'

enum AccountValidation {
	NOT_VALID,
	VALID,
}

const registerLaundryProviderSchema = z.object({
	body: z.object({
		name: z.coerce
			.string({
				required_error: 'Laundry name is required',
			})
			.min(2, 'Laundry name must be at least 2 characters')
			.max(255, 'Landry name must be at most 200 characters'),
		email: z.coerce
			.string({
				required_error: 'Email is required',
			})
			.email('Invalid Email address'),
		password: z.coerce
			.string({ required_error: 'Password is required' })
			.min(8, 'Password must be at least 8 characters ')
			.max(40, 'Password must be at most 40 characters'),
		account_state: z.optional(z.nativeEnum(AccountValidation)),
		priceRange: z.coerce.string().regex(/^[0-9]+(\.[0-9]{2})?$/),
		// min price
		// max price
	}),
})

type RegisterLaundryProviderSchemaType = Omit<
	TypeOf<typeof registerLaundryProviderSchema>['body'],
	'account_state'
>

export { RegisterLaundryProviderSchemaType, registerLaundryProviderSchema }
