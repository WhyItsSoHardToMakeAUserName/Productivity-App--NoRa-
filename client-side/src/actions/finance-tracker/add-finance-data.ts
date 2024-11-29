'use server'

export async function AddFinanceData(formData:FormData){
    try{
        const data = JSON.stringify(Object.fromEntries(formData.entries()));
        const response = await fetch(`${process.env.API_URL}api/FinanceTracker/AddFinanceRecord`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:data
        })

        return await response.json();
    }
    catch(error){
        console.log(error);
    }
}