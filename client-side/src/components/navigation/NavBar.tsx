"use client";

import { Box ,Users,Moon} from '@geist-ui/icons'

import { useRouter } from "next/navigation";
import { RoundLink } from '../ui';

export default function NavBar() {
  const router = useRouter();

  const handle = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) console.log("API ERROR");

    router.push('/auth')
  };

  return (
    <div className="absolute w-screen pt-2 px-2 flex items-center justify-between">
      <p className='flex items-center text-2xl'><Box size={50}></Box> Nora</p>
      <div className='flex items-center gap-2'>
        <Moon size={30}></Moon>
        <RoundLink href=''> <Users size={35}></Users></RoundLink>
      </div>
    </div>
  );
}
