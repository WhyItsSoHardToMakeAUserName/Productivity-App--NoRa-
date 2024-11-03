'use client'

import { Plus , Edit,Trello} from '@geist-ui/icons'
import { useRouter } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type action = {
    element:ReactElement,
    param:string
}

export default function Page(){
    const router = useRouter();
    const [IsExpanded,setIsExpanded] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const actions:action[] = [
        {element:<Plus></Plus>,
        param:"add"
        },
        {element: <Trello></Trello>,
        param:"journal"
        },
        {element: <Edit></Edit>,
        param:"edit"
        },

    ]
    
    useEffect(() => {
        setIsClient(true); // Ensures code only runs in the client-side environment
    }, []);

    function setSearchParam(param:string,event:React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()
        const searchParams = new URLSearchParams(window.location.search)

        searchParams.set('action',param)
        searchParams.set('open','true')
        router.replace(`?${searchParams.toString()}`)
    }


    return(
        isClient && createPortal(
        <div className={`absolute flex flex-col right-0 bg-l-white-200 h-fit rounded-full mx-2 px-[15px] py-[15px] top-1/2 -translate-y-1/2 gap-1
            
        `}
            onMouseEnter={()=>setIsExpanded(true)}
            onMouseLeave={()=>setIsExpanded((false))}
        >
            {
                actions.map((action)=>
                    <button key={action.param} onClick={(event)=>setSearchParam(action.param,event)} className={`bg-l-white-200 hover:bg-l-white-300 rounded-full duration-500 py-[15px] ${IsExpanded? 'w-[54px] px-[15px]':'w-0'} overflow-hidden`}>
                        {action.element}
                    </button>
                )
            }
            
        </div>,
        document.body
        )
    )
}