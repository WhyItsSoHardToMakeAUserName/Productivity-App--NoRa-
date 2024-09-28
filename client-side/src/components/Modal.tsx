'use client'
import { createPortal } from "react-dom";
import {Button, RoundLink} from "@/components/ui";
export default function Modal({}){

    return(
        <div>
            {createPortal(
                <div className="fixed inset-0 flex justify-center items-center h-screen w-screen">
                    <div className="absolute inset-0  bg-slate-700 opacity-50 z-10">
                    </div>
                    <div className="fixed w-1/2 h-1/2 bg-slate-200 rounded-3xl z-10">
                        <RoundLink
                        href="http://localhost:3000/feature/finance-tracker?show=false" 
                        className="m-2"
                        >x</RoundLink>
                        <form className="text-black">
                            <label htmlFor="asd">Category</label>
                            <input type="text" name="asd" placeholder=""/>
                            
                            <label htmlFor="asd">Amount</label>
                            <input type="text" name="asd" placeholder=""/>

                            <label htmlFor="asd">Currency</label>
                            <input type="text" name="asd" placeholder=""/>

                            <div className="flex items-center space-x-2">
                                <input 
                                    id="income" 
                                    type="radio" 
                                    name="profit" 
                                    className="" 
                                />
                                <label 
                                    htmlFor="income" 
                                    className=" bg-slate-400 text-white rounded-3xl px-2 checked:bg-slate-200"
                                >
                                    Income
                                </label>
                                </div>

                        </form>
                        
                    </div>
                </div>
                ,
                document.body
            )}
        </div>
    );
}
// export type TFinanceData = {
//     id:number,
//     financeTrackerDataId:number,
//     color:TColor,
//     category:string,
//     amount:number,
//     currency:string,
//     profit:boolean
// }
// export type TColor={
//     id:number,
//     financeDataId:number,
//     red:number,
//     green:number,
//     blue:number
// }