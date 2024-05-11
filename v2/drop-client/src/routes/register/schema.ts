import { z } from 'zod';

export const registerFormSchema = z.object({
	name: z.string().min(2).max(60),
	email: z.string().email(),
	password: z.string().min(6).max(60)
});

export type RegisterFormSchema = typeof registerFormSchema;
