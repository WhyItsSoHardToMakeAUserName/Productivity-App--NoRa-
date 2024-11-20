'use server'

import { TFinanceTrackerData } from "@/types";

export async function FetchFinanceData(id:number):Promise<TFinanceTrackerData> {

  
  try {
    const response = await fetch(`${process.env.API_URL}${process.env.FINANCE_DATA_KEY}${id}`,
      {
        method:"GET",
        cache:"no-store"
      }
    );

    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data: TFinanceTrackerData = await response.json();

    return data;

  } catch (error) {
    console.error("Failed to fetch finance data:", error);
    
    const fallbackData:TFinanceTrackerData = {
      userId: 0,
      backgroundOpacity: 0,
      borderOpacity: 0,
      financeRecords: []
    }

    // Return a fallback response or an empty chart in case of failure
    return fallbackData;
  }
}
