'use server'
import { Chart,SideBar,ToolBar } from "@/components/features/finance-tracker";
import Filters from "@/components/features/finance-tracker/Filters";
import StoreProvider from "@/redux/StoreProvider";
import { cookies } from "next/headers";
import { useMemo } from "react";


export default async function Page() {
  const token = useMemo(()=> cookies().get('token')?.value,[]); 
  return (
    <div className="flex flex-col w-1/2 items-center justify-center">
      <div className="h-3/4 max-w-[700px] flex-col w-full flex justify-center">
      <StoreProvider token={token}>
        <Chart></Chart>
        <SideBar></SideBar>
        <ToolBar></ToolBar>
      </StoreProvider>
      </div>
    </div>
  );
}
