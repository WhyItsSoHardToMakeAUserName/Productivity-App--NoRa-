'use server'

export async function DeleteFinanceRecord(categoryId: number):Promise<number>{
    try {
      const response = await fetch(
        `${process.env.API_URL}${process.env.FINANCE_TRACKER_KEY}DeleteFinanceRecord/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete finance record: ${errorText}`);
      }
      return response.status
    } catch (error) {
      console.error("Error deleting category:", error);
      throw(error);
    }
  }