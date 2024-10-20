import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'

export async function middleware(request: NextRequest){
    const token = request.cookies.get("token")?.value
    console.log(token)
    
    //Token Validation
    if(!token){
        if(request.nextUrl.pathname != '/auth') return NextResponse.redirect(new URL('/auth',request.url));
        return NextResponse.next();
    }
    const secret = process.env.JWT_TOKEN_KEY

    if(!secret) throw Error("Jwt token key is not configured in the local environment.")

    try{
        await jose.jwtVerify(token,new TextEncoder().encode(secret))

        if(request.nextUrl.pathname === "/auth"){
            return NextResponse.redirect(new URL('/',request.url));
        }
        return NextResponse.next();
    }
    catch(error){
        console.log(error)
        if(request.nextUrl.pathname === "/auth") return null;
        return NextResponse.redirect(new URL('/auth',request.url));

    }

    //
}

export const config = {
    matcher:[
        '/((?!_next/static).*)'
    ]
}