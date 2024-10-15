import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export function middleware(request: NextRequest){
    const token = request.cookies.get("token")?.value
    
    //Token Validation
    if(!token){
        return NextResponse.redirect(new URL('/auth',request.url));
    }

    const secret = process.env.JWT_TOKEN_KEY

    if(!secret) throw Error("Jwt token key is not configured in the local environment.")

    console.log("Token " + token)
    try{
        console.log(jwt.decode(token));
        jwt.verify(token,secret , {algorithms:['HS512']})
        console.log("AUthenticated")
        return NextResponse.redirect(new URL('/feature',request.url));
    }
    catch{
        console.log("jwt not valid")
        return NextResponse.redirect(new URL('/auth',request.url));
    }

}

export const config = {
    matcher:[
        '/((?!auth|_next/static).*)'
    ]
}