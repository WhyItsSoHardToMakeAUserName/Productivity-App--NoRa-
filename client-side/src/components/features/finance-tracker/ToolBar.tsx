'use client'
import { createPortal } from "react-dom";
import { ChevronUp } from '@geist-ui/icons';
import { useSearchParams ,useRouter} from "next/navigation";
import { useEffect, useMemo,useRef, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import FAdd from "./tool-bar/FAdd";

export function ToolBar({categories}:any) {
    //prevent loading before client render
    const [isClient,setIsClient] = useState(false);
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

    const currentTool = useMemo(() => {
        switch (action) {
            case 'add':
                return <FAdd ref={toolBarContent}/>;
            case 'edit':
                return <p ref={toolBarContent}>edit</p>;
            case 'journal':
                return (
                    <div ref={toolBarContent}>
                        <p>journal</p>
                        <p>journal</p>
                        <p>journal</p>
                    </div>
                );
            default:
                return <p>default</p>;
        }
    }, [action]);
    

    const transition = useTransition(currentTool, {
        from:{opacity:0,height:0},
        enter: (item) => async (next) => {
            const height = open ? toolBarContent.current?.clientHeight : 0; // Set height based on `open`
            await next({ opacity: 1, height });
        },
        leave:{opacity:0,height:0}
    })

    if(!isClient) return null

    return createPortal(
        <div className="absolute w-[70vw] bottom-0 flex flex-col h-fit items-center justify-center left-1/2 -translate-x-1/2 bg-l-white-200 rounded-t-full">
            <div className="cursor-pointer">
                <div onClick={toggleOpen}>
                <ChevronUp className={`transition-transform duration-300 ${open ? 'rotate-0' : 'rotate-180'}`} />

                </div>
            </div>
                {transition((styles,item) => (
                <animated.div style={styles} className="w-full flex justify-center">
                    <div className="w-[60%]">
                        {item}
                    </div>
                </animated.div>
                ))}
            </div>
        ,document.body
    );
}
