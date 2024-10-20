'use client'
import { createPortal } from "react-dom";
import React, { ComponentType, ReactElement, useState } from "react";
interface Prop{
    children:ReactElement,
    ModalOpenButton:ComponentType<{onClick:() => void , className:string , children?:string}>,
    className:string,
    btnContent:string
}

export function Modal({children,ModalOpenButton,className,btnContent}:Prop){
    const [open, setOpen] = useState(false)

    const show = ()=>{
        setOpen(true)
    }
    const hide = ()=>{
        setOpen(false)
    }

    return(
        <div>
            <ModalOpenButton onClick={show} className={className} children={btnContent}/>
            {open&&  createPortal(
                    <>
                        {React.cloneElement(children, { hide })}
                    </>
                ,
                document.body
            )}
        </div>
    );
}