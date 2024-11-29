import { RootState } from "@/redux/store";
import { Edit3, X } from "@geist-ui/icons";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

// Wrap FEdit with forwardRef
const FEdit = forwardRef<HTMLDivElement,React.HTMLProps<HTMLDivElement>>((props, ref) => {
    const reduxData = useSelector((state: RootState) => state.financeDataSlice.value);
    console.log(reduxData)
    

    return (
        <div ref={ref} className="overflow-y-scroll max-h-[50vh] no-scrollbar">
            {
                reduxData.data.financeRecords.map((f)=>(
                    f.editLogs.map((de)=>(
                        <div key={de.id} className="flex justify-between">
                            <p>{de.log}</p>
                            <p>{new Date(de.dateEdited).toLocaleString()}</p>
                        </div>
                    ))
                ))
            }
        </div>
    )
})

export default FEdit;
