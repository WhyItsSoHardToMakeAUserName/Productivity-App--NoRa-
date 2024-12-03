"use client";

import { Box } from '@geist-ui/icons'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export default function NavBar() {
    const router = useRouter();


    return (
      <>
      <ToastContainer />
      <div className="pt-2 px-5 flex items-center justify-between">
        <Link href="/" className='flex items-center text-2xl'><Box size={50}></Box> NoRa</Link>
        <div className='hidden md:block'>
          <button onClick={()=>{toast.warning("Why Not?")}}>Why NoRa?</button>
        </div>
        <div className='flex items-center gap-4'>
          <Link href={"/auth?register=true"}>Sign up</Link>
          <Link href={"/auth"} className='p-3 px-5 rounded-full bg-blue-600 text-white'>Log in </Link>
        </div>
      </div>
      </>
  );
}
