'use server'

export async function UpdateFinanceRecord(formData:FormData){
    try {
        const data = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(data);
        const response = await fetch(
        `${process.env.API_URL}${process.env.FINANCE_TRACKER_KEY}UpdateFinanceRecord`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:data
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update finance record: ${errorText}`);
      }
      return response.status
    } catch (error) {
      console.error("Error deleting category:", error);
      throw(error);
    }
  }