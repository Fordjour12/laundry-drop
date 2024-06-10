import { z } from "zod"

export const serviceFormSchema = z.object({
    name: z.string().min(3).max(500),
    description: z.string().min(3).max(800),
    price: z.number().min(0.01),
    image: z.string().min(3),

})


export type ServiceFormSchema = typeof serviceFormSchema