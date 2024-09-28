import { TFinanceData, TFinanceTrackerData } from "@/types";

export async function FetchFinanceData() {
  const id = 1;
  
  try {
    const response = await fetch(`${process.env.API_URL}${process.env.FINANCE_DATA_KEY}${id}`);

    // Check if the response is successful (status in the range 200–299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: TFinanceTrackerData = await response.json();
    let labels: string[] = [];
    let values: number[] = [];
    let backgroundColors: string[] = [];
    let borderColors: string[] = [];

    data.financeData.map((d) => (
      labels.push(d.category),
      values.push(d.amount),
      backgroundColors.push(`rgba(${d.color.red},${d.color.green},${d.color.blue},${data.backgroundOpacity})`),
      borderColors.push(`rgba(${d.color.red},${d.color.green},${d.color.blue},${data.borderOpacity})`)
    ));

    const chartData = {
      labels,
      datasets: [
        {
          label: '',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };

    return chartData;

  } catch (error) {
    console.error("Failed to fetch finance data:", error);

    // Return a fallback response or an empty chart in case of failure
    return {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    };
  }
}
