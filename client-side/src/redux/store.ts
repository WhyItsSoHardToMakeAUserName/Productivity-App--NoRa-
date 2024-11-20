import { configureStore } from "@reduxjs/toolkit"
import financeDataSlice from "./features/financeDataSlice"

export const makeStore = () => {
    return configureStore({
        reducer:{financeDataSlice}
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']