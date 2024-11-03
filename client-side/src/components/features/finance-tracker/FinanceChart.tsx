"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { chartOptions } from "@/constants";
import FinanceSideBar from "./FinanceSideBar";
import FinanceToolBar from "./FinanceToolBar";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FinanceChart({ data }: any) {
  return (
    <div className="flex max-w-full">
      <Doughnut data={data} options={chartOptions} />
      <FinanceSideBar></FinanceSideBar>
      <FinanceToolBar></FinanceToolBar>
    </div>
  );
}
