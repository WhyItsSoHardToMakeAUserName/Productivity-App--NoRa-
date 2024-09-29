'use client'
import { createPortal } from "react-dom";
import {Button, RoundLink} from "@/components/ui";
import { getRandomHexColor } from "./utils/util";
export default function Modal({}){

    return(
        <div>
            {createPortal(
                <div className="fixed inset-0 flex justify-center items-center h-screen w-screen">


                    {/* transparent background */}
                    <div className="absolute inset-0  bg-slate-700 opacity-50 z-10"></div>

                    <div className="fixed w-1/2 h-1/2  rounded-3xl z-10 min-w-[400px] max-w-[600px]">
                        <RoundLink
                        href="http://localhost:3000/feature/finance-tracker?show=false" 
                        className="m-2"
                        >x</RoundLink>
                        <form className="text-black flex justify-center flex-col items-center">

                            {/* top container */}
                            <div className="flex flex-col bg-white h-20 w-full items-center  justify-around rounded-xl mb-10">

                                {/* top div */}
                                <div className="flex justify-around w-full">
                                    {/* Currency Select */}
                                    <div>
                                        <input id="currency" type="radio" name="currency" className="peer hidden" defaultChecked />
                                        <label 
                                            htmlFor="currency" 
                                            className=" bg-slate-200 text-black rounded-3xl px-2 py-[3px] text-xs">
                                            kzt
                                        </label>
                                    </div>
                                    {/* Amount of money tracking */}
                                    <input type="number" max="9999999999999" name="amount" placeholder="0" className=" bg-slate-200 text-right h-7 rounded-full w-2/3"/>
                                </div>

                                {/* Income Or Expense */}
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <input id="income" type="radio" name="profit" className="peer hidden" defaultChecked />
                                        <label 
                                            htmlFor="income" 
                                            className="font-light bg-slate-400 text-white items-center rounded-full py-1 px-2 peer-checked:bg-slate-700 duration-200 cursor-pointer">
                                            Income
                                        </label>
                                    </div>
                                    <div>
                                        <input id="expense" type="radio" name="profit" className="peer hidden" />
                                        <label 
                                            htmlFor="expense" 
                                            className="font-light bg-slate-400 text-white items-center rounded-full py-1 px-2 peer-checked:bg-slate-700 duration-200 cursor-pointer">
                                            Expense
                                        </label>
                                    </div>
                                </div>


                            </div>

                            {/* bottom container */}
                            <div className="bg-slate-200 w-full flex justify-around items-center rounded-xl h-[80px] mb-6">
                                <input type="color" defaultValue={getRandomHexColor()} className="rounded-full w-5 h-5 border-none" />
                                <label htmlFor="category">Category</label>
                                <input type="text" id="category" name="category" 
                                className="rounded-3xl  "/>
                                <button>v</button>
                            </div>

                            <input type="submit" value="Save" className="bg-white rounded-full px-2 py-1 cursor-pointer hover:bg-slate-300 duration-150"/>

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