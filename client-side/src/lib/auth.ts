import { cookies } from "next/headers";

export function deleteCookie(name:string){
    console.log(document.cookie)
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    
}