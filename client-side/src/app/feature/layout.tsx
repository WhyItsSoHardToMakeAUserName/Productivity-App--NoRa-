import '@/app/globals.css'
import Link from 'next/link';

export default function Navigation({children}:{ children: React.ReactNode }){
    const links = [
        {
            name:"Finance",
            href:"/feature/finance-tracker"
        },
        {
            name:"ToDoList",
            href:"/feature/to-do-list"
        },
    ]
    return(
        <div>

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
            </div>

            <div className='min-h-screen flex justify-center'>
                {children}
            </div>

        </div>
    )
}