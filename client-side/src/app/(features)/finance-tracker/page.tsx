import { FetchFinanceData } from "@/actions/finance-tracker/fetch-finance-data";
import FinanceChart from "@/components/FinanceChart";

export default async function Page() {
  var data = await FetchFinanceData();

  return (
    <div className="flex flex-col items-center justify-center w-1/3">
      <div className="h-3/4  w-full  flex justify-center">
        <FinanceChart data={data}></FinanceChart>
      </div>
    </div>
  );
}
