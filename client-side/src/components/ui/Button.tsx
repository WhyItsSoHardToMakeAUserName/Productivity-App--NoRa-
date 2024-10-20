import React, { ReactNode } from "react";

type Props = {
    children?:ReactNode
}&React.HTMLAttributes<HTMLButtonElement>

export function Button({...props}:Props){
    return(
        <>
            <button {...props} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full px-3 w-fit ${props.className}`}>{props.children}</button>
        </>
    );
}