"use client"
import { deleteCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";

const handle =( ) => {
    deleteCookie("token")
    console.log("trigger")
}

export default function NavBar(){
        const links = [
        {
            name:"Finance",
            href:"finance-tracker"
        },
        {
            name:"ToDoList",
            href:"to-do-list"
        },
    ]
    return(
        <div className="flex justify-around absolute min-w-full">
        {links.map((link) =>{
            return(
                <Link
                    key={link.name}
                    href={link.href}
                    className=' opacity-30 hover:opacity-100 transition-opacity duration-200'
                >
                    {link.name}
                </Link>
            );
        })}
        <button onClick={handle} className='opacity-30 hover:opacity-100 transition-opacity duration-200'>logout</button>
    </div>


    )
}