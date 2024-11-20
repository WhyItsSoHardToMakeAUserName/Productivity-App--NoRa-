'use client'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { chartOptions } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart() {
  const reduxData = useSelector((state:RootState)=> state.financeDataSlice.value)

  const labels:string[] = []
  const data:number[] = []
  const backgroundColors:string[] = []

  const categories = reduxData.categories


  //assign finance records into seperate arrays 
  reduxData.data.financeRecords.map((financeRecord)=>{
    const category = categories.find((c)=> c.id == financeRecord.categoryId)
    labels.push(category?.name||'common');
    data.push(financeRecord.amount);
    backgroundColors.push(`rbg(${category?.red},${category?.green},${category?.blue})`);
  })
  
  //data for finance chart
  const chartData = {
    labels,
    datasets:[{
      label:'value',
      data,
      backgroundColors
    }]
  }

  return (
    <div className="flex max-w-full">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
}
