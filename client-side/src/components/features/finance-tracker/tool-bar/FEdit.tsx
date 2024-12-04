import { RootState } from "@/redux/store";
import { Coffee, Edit3, Filter, X } from "@geist-ui/icons";
import React, { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFinanceRecord } from "@/actions/finance-tracker/delete-finance-data";

import { toast, ToastContainer } from "react-toastify";
import { RdeleteRecord } from "@/redux/features/financeDataSlice";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import { Modal } from "@/components/ui";
import FinanceRecordUpdateForm from "@/components/modals/FinanceRecordUpdateForm";

// Wrap FEdit with forwardRef
const FEdit = forwardRef<HTMLDivElement,React.HTMLProps<HTMLDivElement>>((props, ref) => {
    const reduxData = useSelector((state: RootState) => state.financeDataSlice.value);
    const dispatch = useDispatch();

    const [isLoading,setIsLoading] = useState(false);

    return (
        <div ref={ref} className="overflow-y-scroll max-h-[50vh] no-scrollbar">
            <ToastContainer />
            {isLoading && <LoadingAnimation></LoadingAnimation>}
        

            <div  className="flex justify-between items-center pb-3">
            <div className="grid grid-cols-3 xl:grid-cols-4  gap-3 bg-l-white-100 rounded-full p-3 w-full">
                <p className="overflow-x-scroll">Category</p>
                <p className="overflow-x-scroll">Amount</p>
                <p>Currency</p>
                <p className="xl:block hidden overflow-x-scroll text-nowrap">Date Created</p>
            </div>
            <div className="flex">
                <button className="rounded-full p-3 mx-3 bg-l-white-300 hover:bg-blue-600 active:bg-blue-900 hover:text-white duration-300">
                    <Filter></Filter>
                </button>
                <button className="rounded-full p-3 bg-l-white-300 hover:bg-blue-600 active:bg-blue-900 hover:text-white duration-300">
                    <Coffee></Coffee>
                </button>
            </div>
        </div>
    {reduxData.data.financeRecords.map((f) => (
        <div key={f.id} className="flex justify-between items-center pb-3">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-3 bg-l-white-100 rounded-full p-3 w-full">
                <p className="overflow-x-scroll">{reduxData.categories.find((c) => c.id == f.categoryId)?.name}</p>
                <p className="overflow-x-scroll">{f.amount}</p>
                <p>{f.currency}</p>
                <p className="xl:block hidden overflow-x-scroll text-nowrap">{new Date(f.dateCreated).toLocaleString()}</p>
            </div>
            <div className="flex">
                    {/* temporary solution */}
                    <Modal
                    buttonStyle="rounded-full p-3 mx-3 bg-l-white-300 hover:bg-blue-600 active:bg-blue-900 hover:text-white duration-300"
                    btnContent={<Edit3 />}
                    >
                       
                        <FinanceRecordUpdateForm setIsLoading={setIsLoading} financeRecord={f}/>

                    </Modal>
                <button onClick={async()=>{
                    console.log("click");
                    setIsLoading(true)
                    const response = await DeleteFinanceRecord(f.id)
                    if(response == 200){
                        dispatch(RdeleteRecord(f.id))
                    }
                    else{
                        toast.error("Something went wrong while deleting record. Try again later")
                    }
                    setIsLoading(false);

                }}  className="rounded-full p-3 bg-red-500 hover:bg-red-800 active:bg-red-950 duration-300">
                    <X color="#ffffff" />
                </button>
            </div>
        </div>
    ))}
</div>

    );
});

FEdit.displayName = 'FEdit'

export default FEdit;
