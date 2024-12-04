import NavBar from '@/components/navigation/NavBar';
import SideBar from '@/components/navigation/SideBar';

export default function Navigation({children}:{ children: React.ReactNode }){

    return(
        <>
            <NavBar></NavBar>
            <SideBar></SideBar>
            <div className='max-h-screen flex-auto overflow-hidden flex justify-center'>
                {children}
            </div>
        </>
    )
}