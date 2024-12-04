import { RootState } from "@/redux/store";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

const FJournal = forwardRef<HTMLDivElement,React.HTMLProps<HTMLDivElement>>((props, ref) => {
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
FJournal.displayName = "FJournal"

export default FJournal;
