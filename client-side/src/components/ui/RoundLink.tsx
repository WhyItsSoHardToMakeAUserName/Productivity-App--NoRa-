import Link from "next/link";

type Prop = {
    children?:React.ReactNode,
    href:string,
    className?:string
}

export function RoundLink({children,href,className}:Prop){
    return(
        <Link href={href} className={`min-w-8 w-8 h-8 bg-slate-300 rounded-full text-black hover:bg-slate-500 duration-200 flex justify-center items-center ${className}`}>
            {children}
        </Link>
    )
}