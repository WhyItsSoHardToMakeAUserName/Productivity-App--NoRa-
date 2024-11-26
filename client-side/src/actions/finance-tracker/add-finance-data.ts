'use server'

export async function AddFinanceData(formData:FormData){
    try{
        const data = Object.fromEntries(formData.entries());
        const response = await fetch(`${process.env.API_URL}api/FinanceTracker/AddFinanceRecord`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })    
        return response.status
    }
    catch(error){
        console.log(error);
    }
}