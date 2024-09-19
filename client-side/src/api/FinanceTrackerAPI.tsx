import { TFinanceData, TFinanceTrackerData } from "@/types";



export async function FetchFinanceData() {
    const id = 1;
    const response = await fetch(`${process.env.API_URL}${process.env.FINANCE_DATA_KEY}${id}`)
    const data:TFinanceTrackerData = await response.json()
    let labels:string[] = []
    let values:number[] = []
    let backgroundColors:string[] = []
    let borderColors:string[] = []

    data.financeData.map((d)=>(
      labels.push(d.category),
      values.push(d.amount),
      backgroundColors.push(`rgba(${d.color.red},${d.color.green},${d.color.blue},${data.backgroundOpacity})`),
      borderColors.push(`rgba(${d.color.red},${d.color.green},${d.color.blue},${data.borderOpacity})`)
    ));

    const data1 = {
        labels,
        datasets: [
          {
            label: '',
            data:values,
            backgroundColor:backgroundColors,
            borderColor:borderColors,
            borderWidth: 1,
          },
        ],
        
      };
      console.log(backgroundColors)
      return data1
}