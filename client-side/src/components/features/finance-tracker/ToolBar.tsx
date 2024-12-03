'use client'

import { createPortal } from "react-dom";
import { ChevronUp } from '@geist-ui/icons';
import { useSearchParams ,useRouter} from "next/navigation";
import { useEffect,useRef, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import FAdd from "./tool-bar/FAdd";
import FEdit from "./tool-bar/FEdit";
import FJournal from "./tool-bar/FJournal";

export function ToolBar() {
    //prevent loading before client render
    const [isClient,setIsClient] = useState(false);
    const [currentTool,setCurrentTool] = useState(<></>);
    useEffect(()=>(setIsClient(true)),[])

    const router = useRouter();
    const searchParam = useSearchParams();

    var action = searchParam.get('action');
    const open =  searchParam.get('open') === 'true';    

    if(!open) {action = ''};

    const toolBarContent = useRef<HTMLDivElement>(null);

    const toggleOpen = ()=> {
        const newSearchParams = new URLSearchParams(searchParam);
        newSearchParams.set('open',(!open).toString());
        router.replace(`?${newSearchParams.toString()}`);
    }

    useEffect(() => {
        switch (action) {
            case 'add':
                setCurrentTool(<FAdd ref={toolBarContent}/>) ;
                break;
            case 'edit':
                setCurrentTool( <FEdit ref={toolBarContent}></FEdit>);
                break;
            case 'journal':
                setCurrentTool ( <FJournal ref={toolBarContent}></FJournal>
                );
                break;
            default:
                setCurrentTool(<></>) ;
        }
    }, [action]);

    const transition = useTransition(currentTool, {
        from:{opacity:0,height:0},
        enter: (item) => async (next) => {
            const height = open ? toolBarContent.current?.clientHeight : 0; 
            await next({ opacity: 1, height });
        },
        leave:{opacity:0,height:0}
    })

    if(!isClient) return null

    return createPortal(
        <div className="absolute w-[95vw] md:w-[70vw] bottom-0 flex flex-col h-fit items-center justify-center left-1/2 -translate-x-1/2 bg-l-white-200 rounded-t-[100px]">
            <div className="cursor-pointer">
                <div onClick={toggleOpen}>
                <ChevronUp className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`} />

                </div>
            </div>
                {transition((styles,item) => (
                <animated.div style={styles} className="w-full flex justify-center">
                    <div className="w-[80%] sm:w-[60%]">
                        {item}
                    </div>
                </animated.div>
                ))}
            </div>
        ,document.body
    );
}
