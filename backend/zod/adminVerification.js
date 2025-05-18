import {z} from "zod";

export const adminVerification= z.object({
    email:z.string().email(),
     password: z.string()
        .min(4)
        .max(20)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
            message: "Password must contain at least one letter and one number",
        }),
    firstName:z.string().min(1),
    lastName:z.string().min(1)
})