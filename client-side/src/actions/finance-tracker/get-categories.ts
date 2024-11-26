'use server'

import { TCategory } from "@/types";

export async function FetchCategories(UserId:number):Promise<TCategory[]>{
    try{
        const response = await fetch(`${process.env.API_URL}${process.env.FINANCE_CATEGORY_KEY}${UserId}`);

        return response.json()
    }
    catch(error){
        console.log(error);
        const categories:TCategory[] =[{
            id: 0,
            name: "",
            hexColor:""
        }]
        return categories
    }
}