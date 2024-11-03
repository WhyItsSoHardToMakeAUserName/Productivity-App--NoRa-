import { Chart, Legend } from "chart.js";

export const chartOptions = {
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (tooltipItem: { raw: any }) {
          // Customize the label text shown in the tooltip
          return `${tooltipItem.raw} $`;
        },
      },
      displayColors: false, // This removes the color box next to the tooltip label
    },
    legend:{
      labels:{
        usePointStyle: true, // Makes each legend item circular by default
      }
    }
  },
};
