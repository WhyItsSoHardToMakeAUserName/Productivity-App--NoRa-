import { Chart,SideBar,ToolBar } from "@/components/features/finance-tracker";
import StoreProvider from "@/redux/StoreProvider";


export default async function Page() {
  console.log('rerender')
  return (
    <div className="flex flex-col items-center justify-center w-1/3">
      <div className="h-3/4  w-full  flex justify-center">
      <StoreProvider >
        <Chart></Chart>
        <SideBar></SideBar>
        <ToolBar></ToolBar>
      </StoreProvider>
      </div>
    </div>
  );
}
