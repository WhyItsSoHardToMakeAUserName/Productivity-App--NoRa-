'use client'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Plugin } from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import { fredoka } from "@/components/ui";
import {chartOptions} from "@/constants"

export function Chart() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [currentCurrency,setCurrentCurrency] = useState<string|null>('USD');
  const [isProfit,setIsProfit] = useState<boolean|null>(null);
  const reduxData = useSelector((state:RootState)=> state.financeDataSlice.value)

  const labels:string[] = []
  const data:number[] = []
  const backgroundColors:string[] = []

  const categories = reduxData.categories
  const filteredRecords = reduxData.data.financeRecords.filter((f)=>f.currency==currentCurrency && (isProfit==null || isProfit==f.isProfit))
  
  let chartCenterText = "mock";

  if(isProfit == null){
    var totalAmount = filteredRecords.reduce(((total,record)=>{
      if(record.isProfit) return total+record.amount
      else return total-record.amount;
      }),0);

    chartCenterText = `${totalAmount} ${currentCurrency}`;
      
    data.push(totalAmount)
    if(totalAmount>0){
      backgroundColors.push("#a7c957")// green
    }
    else{
      backgroundColors.push("#e63946")// red
    }
    labels.push('Total')
  }
  else{
    chartCenterText = `${isProfit?"Income":"Expense"} `
    filteredRecords.map((financeRecord)=>{
      const category = categories.find((c)=> c.id == financeRecord.categoryId )
      labels.push(category?.name||'common');
      data.push(financeRecord.amount);
      backgroundColors.push(category?.hexColor||'#ffffff');
    })
  }

  const textInsidePlugin: Plugin = {
    id: 'doughnutTextInside',
    afterDatasetsDraw(chart){
      const {ctx} = chart;
      
      ctx.save();

      const xCoord = chart.getDatasetMeta(0).data[0].x;
      const yCoord = chart.getDatasetMeta(0).data[0].y;


      
      ctx.font = `${(yCoord)/10}px ${fredoka.style.fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = "middle";

      ctx.fillText(chartCenterText,xCoord,yCoord)

      ctx.restore();
    }};

  useEffect(() => {
    ChartJS.register(textInsidePlugin);
    return () => {
      ChartJS.unregister(textInsidePlugin);
    };
  }, [isProfit,currentCurrency,reduxData]);
  
  if(data.length == 0){
    data.push(1)
    backgroundColors.push("#ffbe0b")
    ChartJS.unregister(Tooltip)
  }
  
  //data for finance chart
  const chartData = {
    labels,
    datasets:[{
      label:'value',
      data,
      backgroundColor:backgroundColors
    }]
  }

  return (
    <div className="pt-10 h-auto">
      <Filters setIsProfit={setIsProfit} onCurrencySelect={setCurrentCurrency} ></Filters>
      
      <div className="relative h-[80vh] w-[80vw]">
        <Doughnut data={chartData} options={chartOptions}/>
      </div>
    </div>
  );
}
