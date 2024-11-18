import { configureStore } from "@reduxjs/toolkit"
import testSlice from "./features/testSlice"
import financeDataSlice from "./features/financeDataSlice"

export const makeStore = () => {
    return configureStore({
        reducer:{testSlice,financeDataSlice}
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']