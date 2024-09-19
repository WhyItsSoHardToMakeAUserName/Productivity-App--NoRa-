import { FetchFinanceData } from "@/api/FinanceTrackerAPI";
import FinanceChart from "@/components/FinanceChart";

export default async function Page(){
  // const [test ,setTest] = useState("")

  // useEffect(()=>{
  //   fetch("http://localhost:5292/FinanceTracker")
  //   .then(res => res.text())
  //   .then(data=> setTest(data))
  // },[])
    var data = await FetchFinanceData();
    return(
        <div className="flex flex-col items-center justify-center w-1/3">
            <div className="h-3/4  w-full  flex justify-center">
              <FinanceChart data={data}></FinanceChart>
            </div>
        </div>
    );
}