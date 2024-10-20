import NavBar from '@/components/NavBar';

export default function Navigation({children}:{ children: React.ReactNode }){

    return(
        <div>
            <NavBar></NavBar>
            <div className='min-h-screen flex justify-center'>
                {children}
            </div>
        </div>
    )
}