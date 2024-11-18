'use client'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { chartOptions } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { SetInitialFinanceDataAsync } from "@/redux/features/financeDataSlice";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);



export function Chart() {
  const data = useSelector((state:RootState)=> state.financeDataSlice.value)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{

  dispatch(SetInitialFinanceDataAsync())
},[])
console.log(data);

  return (
    <div className="flex max-w-full">
      {/* <Doughnut data={data} options={chartOptions} /> */}
    </div>
  );
}
