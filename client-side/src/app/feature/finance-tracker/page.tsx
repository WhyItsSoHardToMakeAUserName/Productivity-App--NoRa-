'use client'
import { useState,useEffect } from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page(){
  const [test ,setTest] = useState("")

  useEffect(()=>{
    fetch("http://localhost:5292/FinanceTracker")
    .then(res => res.text())
    .then(data=> setTest(data))
  },[])

    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: '',
            data: [12, 19, 3],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
          },
        ],
        
      };

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
        <div className="flex flex-col items-center justify-center w-1/3">
            <div className="h-3/4  w-full  flex justify-center">
                <Doughnut 
                    data={data}
                    options={options}
                />
            </div>
            <p>{test}</p>
        </div>
    );
}