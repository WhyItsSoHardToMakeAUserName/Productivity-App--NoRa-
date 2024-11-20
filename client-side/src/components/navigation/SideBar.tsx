'use client'
import { Home ,Briefcase ,Settings, Bookmark,CheckSquare,List} from '@geist-ui/icons'
import { ReactElement, useEffect, useState } from 'react'
import { createPortal } from "react-dom"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type navElement = {
    label:string,
    jsx:ReactElement,
    route:string
}

export default function SideBar(){
    const path = usePathname();
    const [isExpanded, setIsExpanded] = useState(false)
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Check if we're in the client
    }, []);


    let navElements:navElement[] = [
        {label:"Home",jsx:<Home color={path === '/home' && isExpanded?'f2f2f2':'252422'}></Home>,route:"/home"},
        {label:"Finance",jsx:<Briefcase color={path === '/finance-tracker' && isExpanded?'f2f2f2':'252422'}></Briefcase>,route:"/finance-tracker"},
        {label:"Task Manager",jsx:<List color={path === '/' && isExpanded?'f2f2f2':'252422'}></List>,route:"/"},
        {label:"Notes",jsx:<Bookmark color={path === '/' && isExpanded?'f2f2f2':'252422'}></Bookmark>,route:"/"},
        {label:"To-Do List",jsx:<CheckSquare color={path === '/' && isExpanded?'f2f2f2':'252422'}></CheckSquare>,route:"/"},
    ]

    return(
        isClient && createPortal(
            <div className={`mx-2 px-[15px] py-[30px] gap-[2%] h-[70vh] top-1/2 -translate-y-1/2 justify-between flex flex-col absolute bg-l-white-200 rounded-[40px] transition-all duration-500 overflow-y-scroll overflow-x-hidden
            ${isExpanded ? 'w-[200px]' : 'w-[86px]'}`}
            onMouseEnter={()=> {setIsExpanded(true)}}
            onMouseLeave={()=> setIsExpanded(false)}>
                {navElements.map((element)=>
                    <Link 
                    href={element.route}
                    key={element.label}
                    className={`${path === element.route ? (!isExpanded?'bg-l-white-300':'bg-l-black') : 'hover:bg-l-white-300'} 
                    flex  rounded-full px-[15px] py-[15px] text-nowrap `}>
                        <div className='w-[24px] h-[24px]'>
                            {element.jsx}
                        </div>
                        <p className={`${path === element.route && ('text-l-white-100')}
                            pl-2 text-lg h-[24px] transition-all duration-300
                            ${isExpanded ? 'opacity-100 ': 'opacity-0 pointer-events-none'}`}>
                            {element.label}
                        </p>                
                    </Link>
                )}

                <div className='flex-grow pl-[27px]'>
                    <div className="border-l border-black h-full"></div>
                </div>

                <div className='flex hover:bg-l-white-300 rounded-full px-[15px] py-[15px] text-nowrap'>
                        <div className='w-[24px] h-[30px]'>
                            <Settings></Settings>
                        </div>
                        <p className={`pl-2 text-lg h-[30px] transition-all duration-300
                            ${isExpanded ? 'opacity-100 ': 'opacity-0 pointer-events-none'}`}>
                            Settings
                        </p>                
                    </div>
                
            </div>
            ,
            document.body
        )
        
    )
}