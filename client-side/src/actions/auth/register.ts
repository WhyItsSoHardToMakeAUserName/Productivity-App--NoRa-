"use server"

import userSchema from "@/schemas/user";

export async function Register(formData:FormData){
    const user = {
        username:formData.get("username")?.toString(),
        password:formData.get("password")?.toString(),
        email:formData.get("email")?.toString()
    }
    try{
        userSchema.parse(user)

        const response = await fetch(`${process.env.API_URL}${process.env.AUTH_REGISTER}`,
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(user)
            }
        )    }
    catch(error){
        console.error(error);
    }
}
