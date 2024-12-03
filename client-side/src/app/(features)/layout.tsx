import NavBar from '@/components/navigation/NavBar';
import SideBar from '@/components/navigation/SideBar';

export default function Navigation({children}:{ children: React.ReactNode }){

    return(
        <div className='max-h-screen overflow-hidden'>
            <NavBar></NavBar>
            <SideBar></SideBar>
            <div className='h-screen flex justify-center'>
                {children}
            </div>
        </div>
    )
}