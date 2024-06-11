import { z } from "zod"

export const serviceFormSchema = z.object({
    name: z.string().min(3).max(500),
    description: z.string().min(3).max(800),
    price: z.number().min(0.01),
    image: z.
        instanceof(File, { message: "Please upload an image" })
        .refine(file => file.size < 1024 * 1024 * 5, "Image size must be less than 5MB")
})

export type ServiceFormSchema = typeof serviceFormSchema