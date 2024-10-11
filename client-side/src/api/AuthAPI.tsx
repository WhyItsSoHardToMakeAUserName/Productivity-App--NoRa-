import { TUser } from "@/types";

export async function Register(user:TUser){
    try{
        const response = await fetch(`${process.env.API_URL}${process.env.AUTH_REGISTER}`,
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(user)
            }
        )
    }
    catch(error){
        console.error(error);
    }
}