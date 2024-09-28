'use client'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import RoundButton from "./ui/Button";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FinanceChart({data}:any){

      const options = {
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (tooltipItem: { raw: any; }) {
                // Customize the label text shown in the tooltip
                return `${tooltipItem.raw} $`;
              },
            },
            displayColors: false, // This removes the color box next to the tooltip label
          },
        },
      };
    return(
      <div className="flex max-w-full">
        <Doughnut data={data} options={options}/>
        <RoundButton>+</RoundButton>

      </div>
    )
}