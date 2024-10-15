import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'

export async function middleware(request: NextRequest){
    const token = request.cookies.get("token")?.value
    
    //Token Validation
    if(!token){
        return NextResponse.redirect(new URL('/auth',request.url));
    }

    const secret = process.env.JWT_TOKEN_KEY

    if(!secret) throw Error("Jwt token key is not configured in the local environment.")

    try{
        await jose.jwtVerify(token,new TextEncoder().encode(secret))

        console.log("AUthenticated")

        if(request.url === "/auth"){
            return NextResponse.redirect(new URL('/feature',request.url));
        }
        return NextResponse.next();
    }
    catch(error){
        console.log(error)
        return NextResponse.redirect(new URL('/auth',request.url));

    }
}

export const config = {
    matcher:[
        '/((?!auth|_next/static).*)'
    ]
}