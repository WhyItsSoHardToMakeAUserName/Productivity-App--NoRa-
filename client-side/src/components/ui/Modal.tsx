'use client'
import { createPortal } from "react-dom";
import React, {ReactElement, useState } from "react";
interface Prop{
    onClick?:()=>void,
    children:ReactElement,
    buttonStyle:string,
    btnContent:ReactElement|string
}

export function Modal({onClick,children,buttonStyle,btnContent}:Prop){
    const [open, setOpen] = useState(false)

    const show = ()=>{
        setOpen(true)
    }
    const hide = ()=>{
        setOpen(false)
    }

    return(
        <>
            <button onClick={()=>{show();if(onClick!=undefined){onClick()}}} type="button" className={buttonStyle}>{btnContent}</button>
            {open&&  createPortal(
                    <div className="fixed inset-0 flex justify-center items-center h-screen w-screen">
                        {/* transparent background */}
                        <div onClick={(e)=>{
                            e.preventDefault()
                            hide();
                        }} className="absolute inset-0  bg-slate-700 opacity-50 z-10"></div>
                        <div className="z-20 w-1/2 h-auto">
                            {React.cloneElement(children,{hide})}
                        </div>
                
                    </div>
                ,
                document.body
            )}
        </>
    );
}