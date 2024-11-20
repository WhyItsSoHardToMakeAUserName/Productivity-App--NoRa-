'use server'
import { Chart,SideBar,ToolBar } from "@/components/features/finance-tracker";
import StoreProvider from "@/redux/StoreProvider";
import { cookies } from "next/headers";
import { useMemo } from "react";


export default async function Page() {
  const token = useMemo(()=> cookies().get('token')?.value,[]); 
  return (
    <div className="flex flex-col items-center justify-center w-1/3">
      <div className="h-3/4  w-full  flex justify-center">
      <StoreProvider token={token}>
        <Chart></Chart>
        <SideBar></SideBar>
        <ToolBar></ToolBar>
      </StoreProvider>
      </div>
    </div>
  );
}
