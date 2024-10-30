import NavBar from '@/components/navigation/NavBar';
import SideBar from '@/components/navigation/SideBar';

export default function Navigation({children}:{ children: React.ReactNode }){

    return(
        <div>
            <NavBar></NavBar>
            <SideBar></SideBar>
            <div className='min-h-screen flex justify-center'>
                {children}
            </div>
        </div>
    )
}