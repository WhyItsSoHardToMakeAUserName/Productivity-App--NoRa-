'use server'

export async function deleteCategory(categoryId: number): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.API_URL}${process.env.FINANCE_TRACKER_KEY}DeleteCategories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete category: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }