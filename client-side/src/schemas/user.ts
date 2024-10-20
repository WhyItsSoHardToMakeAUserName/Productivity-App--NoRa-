import { z } from "zod";

const user = z.object({
    username: z.string().min(3,"Username has to consist of at least 3 characters"),
    password:z.string().min(3,"Password has to consist of at least 3 characters"),
    email:z.string().email("Invalid email address")
})

export default user