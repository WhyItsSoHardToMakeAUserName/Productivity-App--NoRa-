import { RootState } from "@/redux/store";
import { Edit3, X } from "@geist-ui/icons";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

// Wrap FEdit with forwardRef
const FEdit = forwardRef<HTMLDivElement,React.HTMLProps<HTMLDivElement>>((props, ref) => {
    const reduxData = useSelector((state: RootState) => state.financeDataSlice.value);

    return (
        <div ref={ref} className="overflow-y-scroll max-h-[50vh] no-scrollbar">

        </div>
    )
})

export default FEdit;
