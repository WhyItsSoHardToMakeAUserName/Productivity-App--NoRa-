import Link from "next/link";

type Prop = {
    children?:React.ReactNode,
    href:string,
    className?:string
}

export function RoundLink({children,href,className}:Prop){
    return(
        <Link href={href} className={` ${className}  rounded-full text-black duration-200 flex justify-center items-center `}>
            {children}
        </Link>
    )
}