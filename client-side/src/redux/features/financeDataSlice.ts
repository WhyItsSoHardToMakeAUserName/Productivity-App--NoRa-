'use client'

import { FetchFinanceData } from "@/actions/finance-tracker/fetch-finance-data"
import { FetchCategories } from "@/actions/finance-tracker/get-categories"
import { TCategory, TFinanceTrackerData } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface financeDataState{
    value:{data:TFinanceTrackerData,categories:TCategory[]}
}
const initialState:financeDataState={
    value: {
        data: {
            userId: 0,
            backgroundOpacity: 1,
            borderOpacity: 1,
            financeRecords: [], // Start with an empty list
        },
        categories: [], // Start with an empty categories array
    },
}

const financeDataSlice = createSlice({
    name:'financeData',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(SetInitialFinanceDataAsync.pending,()=>{
            console.log('loading finance data')
        }),
        builder.addCase(SetInitialFinanceDataAsync.fulfilled,(state,action)=>{
            state.value.data = action.payload.data;
            state.value.categories = action.payload.categories;
        })
    }
})
export const SetInitialFinanceDataAsync = createAsyncThunk<{data:TFinanceTrackerData,categories:TCategory[]}>(
    'fetchFinanceData',
    async ()=>{
        const data:TFinanceTrackerData = await FetchFinanceData();
        const categories:TCategory[] = await FetchCategories(data.userId);

        return {data:data,categories:categories};
    }
) 

export default financeDataSlice.reducer