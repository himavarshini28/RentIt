import {z} from "zod";

export const propertyVerification= z.object({
    name: z.string().min(2),
    description:z.string().min(5).max(200),
    price:z.number().min(5).max(100000),
    imageUrls:z.array(z.string().url()),
    location:z.string().min(2)
})