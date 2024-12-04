import { UpdateFinanceRecord } from "@/actions/finance-tracker/update-finance-data"
import { RUpdateRecord } from "@/redux/features/financeDataSlice";
import { FinanceRecordUpdateDTO, TFinanceRecord } from "@/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

type Props = {
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>,
    financeRecord:TFinanceRecord,
    hide?:any
}


export default function FinanceRecordUpdateForm(
    {setIsLoading,financeRecord,hide}:Props
){
    const [amount,setAmount] = useState<number>(financeRecord.amount);
    const dispatch = useDispatch();

    return(
        <>
            <ToastContainer/>
            <form onSubmit={async(e:React.FormEvent )=>{
                e.preventDefault();
                setIsLoading(true)
                try{
                    const formData = new FormData(e.target as HTMLFormElement)
                    const response = await UpdateFinanceRecord(formData)

                    if(response == 200){
                        const formObject = Object.fromEntries(formData.entries());

                        const data: FinanceRecordUpdateDTO = {
                            id: parseInt(formObject.Id as string), // Convert `id` to a number
                            amount: parseFloat(formObject.Amount as string), // Convert `Amount` to a number
                        };

                        console.log(formObject)

                        dispatch(RUpdateRecord(data))
                        hide();
                    }
                    else{
                        toast.warning("Something went wrong. Try again later")
                    }
                }
                catch(e){
                    console.log(e);
                }

                setIsLoading(false);
            }} className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <input type="text" readOnly name="Id" value={financeRecord.id} hidden />
                    <label htmlFor="amount" className="w-32 bg-blue-600 rounded-full flex justify-center items-center p-2 text-white ">Amount</label>
                    <input id="amount" name="Amount" type="number" value={amount} onChange={(e)=>setAmount(parseInt(e.target.value))} className="w-full rounded-full p-2 pl-4" />
                </div>
                <button type="submit" className="rounded-full p-2 mx-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white duration-300">
                Save
                </button>
            </form>
        </>
    )
}