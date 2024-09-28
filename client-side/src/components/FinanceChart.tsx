'use client'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {RoundLink} from "@/components/ui/RoundLink";
import Modal from "./Modal";
import { useSearchParams } from "next/navigation";

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
      const searchParams = useSearchParams();
      const show = searchParams?.get("show")
    return(
      <div className="flex max-w-full">
        <Doughnut data={data} options={options}/>
        <RoundLink href="/feature/finance-tracker/?show=true">+</RoundLink>
        {show === "true" && <Modal></Modal>}
      </div>
    )
}