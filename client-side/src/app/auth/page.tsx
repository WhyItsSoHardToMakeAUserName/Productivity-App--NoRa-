'use client'
import Carousel from "@/components/ui/Carousel";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import { Box } from "@geist-ui/icons";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function Page(){

    const DynamicAuthFormWithNoSSR = dynamic(
        () => import('@/components/auth/AuthForm'),
        { ssr: false }
      )

    const mockReviews = [
        { name: 'Timson K', review: 'Simply unbelievable! I am really satisfied with my projects and business. This is Absolutely wonderful!' },
        { name: 'Anna L', review: 'This app has helped me stay organized and meet my deadlines consistently. Highly recommend!' },
        { name: 'Mark J', review: 'The perfect tool for managing tasks and staying productive. My workflow has improved drastically!' },
      ];
    return(
    <Suspense fallback={<LoadingAnimation></LoadingAnimation>}>
        <div  className='min-h-[600px] h-screen flex flex-row items-center justify-center md:pl-[3vh]'>
            <div className='p-4 h-[94%] w-[50vw] bg-blue-600 rounded-3xl  hidden md:flex items-center flex-col text-white'>
                <div className=" h-1/4 top-0 flex  items-start">
                    <div className="flex items-center">
                        <Box size={50}></Box>
                        <p>NoRa</p>
                    </div>
                </div>

                <div className="h-1/2 pb-[10%] flex flex-col items-center justify-center">
                    <h1 className=" bold text-5xl text-center">Start your journey with us</h1>
                    <p className=" font-sans opacity-50 text-3xl text-center">One app, endless possibilities for a productive you.</p>
                </div>

                <div className="relative w-full h-1/4">
                    <div className=" rounded-3xl absolute inset-0 bg-black  opacity-30 z-0"></div>
                    <Carousel reviews={mockReviews}/>

                </div>
            </div>
            <div className="h-full flex justify-center items-center md:w-[50vw] flex-col">
                <div className="absolute top-0 mt-[5%] flex md:hidden justify-center items-center">
                <Box size={50} className=" "></Box>
                    <p className="text-3xl">NoRa</p>
                </div>
                <DynamicAuthFormWithNoSSR></DynamicAuthFormWithNoSSR>
            </div>
        </div>
    </Suspense>
    )
}