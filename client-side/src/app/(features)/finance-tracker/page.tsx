'use server'
import { Chart,SideBar,ToolBar } from "@/components/features/finance-tracker";
import StoreProvider from "@/redux/StoreProvider";
import { cookies } from "next/headers";
import { useMemo } from "react";


export default async function Page() {
  const token = useMemo(()=> cookies().get('token')?.value,[]); 
  return (
      <>
        <StoreProvider token={token}>
          <Chart></Chart>
          <SideBar></SideBar>
          <ToolBar></ToolBar>
        </StoreProvider>
      </>
  );
}
