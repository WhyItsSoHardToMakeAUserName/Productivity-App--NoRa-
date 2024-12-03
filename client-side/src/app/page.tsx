'use client';

import Image from "next/image";
import FinanceTrackerImage from '@/public/FinanceTrackerDemo.png';
import NavBar from "@/components/main-menu/NavBar";
import Footer from "@/components/main-menu/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />

      <div className=" top-0 h-screen flex md:flex-row flex-col  justify-center items-center text-center">
         
        {/* Left Section */}
        <div className="px-[5%] flex flex-col items-center justify-center bottom-0 h-[30vh] md:w-[40%] space-y-4">
          <h1 className="text-4xl w-full font-bold leading-tight text-gray-800">
            Welcome to <span className="w-full text-blue-500">NoRa Productivity App</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Boost your productivity and streamline your workflow with Nora. Manage tasks, track progress, and stay organized effortlessly.
          </p>
          <Link href="/auth?register=true" className="px-6 py-3 max-w-[50vw] bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all">
            Get Started
          </Link>
        </div>

        {/* Right Section */}
        <div className="justify-center items-center md:pr-[5%] mt-8  ">
          <Image 
            className="rounded-md max-w-full h-auto hidden sm:block"
            src={FinanceTrackerImage}
            alt="Nora Productivity App Screenshot"
          />
        </div>
        
      </div>

      <Footer/>

    </>
  );
}
