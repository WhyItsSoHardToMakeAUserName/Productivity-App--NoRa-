import { fredoka } from "@/components/ui";
import { TooltipItem } from "chart.js";

export const chartOptions = {
  responsive:true,
  maintainAspectRatio:false,
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (tooltipItem: TooltipItem<"doughnut">) {
          // Customize the label text shown in the tooltip
          return `${tooltipItem.raw} $`;
        },
      },
      displayColors: false, // This removes the color box next to the tooltip label
    },
    legend:{
      labels:{
        usePointStyle: true, // Makes each legend item circular by default
        font:{
          family:fredoka.style.fontFamily,
        }
      }
    }
  },
};