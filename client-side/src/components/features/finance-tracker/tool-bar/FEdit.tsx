import { RootState } from "@/redux/store";
import { Edit3, X } from "@geist-ui/icons";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import styles from './tool-bar.module.css'

// Wrap FEdit with forwardRef
const FEdit = forwardRef<HTMLDivElement,React.HTMLProps<HTMLDivElement>>((props, ref) => {
    const reduxData = useSelector((state: RootState) => state.financeDataSlice.value);

    return (
        <div ref={ref} className="overflow-y-scroll max-h-[50vh] no-scrollbar">
    {reduxData.data.financeRecords.map((f) => (
        <div key={f.id} className="flex justify-between items-center pb-3">
            <div className="grid grid-cols-4 gap-3 bg-l-white-100 rounded-full p-3 w-full">
                <p className="overflow-x-scroll">{reduxData.categories.find((c) => c.id == f.categoryId)?.name}</p>
                <p className="overflow-x-scroll">{f.amount}</p>
                <p>{f.currency}</p>
                <p className="overflow-x-scroll text-nowrap">{new Date(f.dateCreated).toLocaleString()}</p>
            </div>
            <div className="flex">
                <button className="rounded-full p-3 mx-3 bg-l-white-300">
                    <Edit3 />
                </button>
                <button className="rounded-full p-3 bg-red-500">
                    <X color="#ffffff" />
                </button>
            </div>
        </div>
    ))}
</div>

    );
});

export default FEdit;
