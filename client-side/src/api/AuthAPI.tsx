"use server"
import { z } from "zod";
import { cookies } from "next/headers";
const userSchema = z.object({
    username: z.string().min(3,"Username has to consist of at least 3 characters"),
    password:z.string().min(3,"Password has to consist of at least 3 characters"),
    email:z.string().email("Invalid email address")
})

export async function Register(formData:FormData){
    const user = {
        username:formData.get("username")?.toString(),
        password:formData.get("password")?.toString(),
        email:formData.get("email")?.toString()
    }
    try{
        // userSchema.parse(user)

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
    console.log(formData)
}

export async function Login(formData:FormData){
    const user = {
        username:'null',
        password:formData.get("password")?.toString(),
        email:formData.get("email")?.toString()
    }

    try{
        // userSchema.parse(user)
        const response = await fetch(`${process.env.API_URL}${process.env.AUTH_LOGIN}`,
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(user)
            }
        )

        console.log("fetched")

        const token = await response.text();
        
        console.log(token)
        cookies().set('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/',
        });
        console.log("cookies set")
        
    }
    catch(error){
        console.log(error)
    }
}