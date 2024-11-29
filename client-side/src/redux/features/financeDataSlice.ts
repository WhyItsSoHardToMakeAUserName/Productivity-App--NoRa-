'use client'

import { FetchFinanceData } from "@/actions/finance-tracker/fetch-finance-data"
import { FetchCategories } from "@/actions/finance-tracker/get-categories"
import { TCategory, TFinanceRecord, TFinanceTrackerData } from "@/types"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { JWTPayload } from "jose"
import { arch } from "os"

export interface financeDataState{
    value:{data:TFinanceTrackerData,categories:TCategory[],token:JWTPayload}
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
        token:{}
    },
}

const financeDataSlice = createSlice({
    name:'financeData',
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.value.token = action.payload;
        },
        RdeleteCategory:(state,action)=>{
            const categoryId = action.payload;
            state.value.categories = state.value.categories.filter(
                (c)=> c.id != categoryId
            );
            console.log('deleting from rstore ')
        },
        addFinanceRecord:(state,action:PayloadAction<TFinanceRecord>)=>{   
            const newFinanceRecord = action.payload;

            const categories = state.value.categories
            const financeRecords = state.value.data.financeRecords

            const categoryIsUnique = !categories.some((c)=>c.id == newFinanceRecord.category.id);
            const recordIsUnique = !financeRecords.some((f)=>f.id == newFinanceRecord.id);

            if (categoryIsUnique) {
                categories.push(newFinanceRecord.category);
            }
            
            if(recordIsUnique){
                console.log("unique record")
                financeRecords.push(newFinanceRecord);
            }
            else{
                console.log('not unique record')
                const f = financeRecords.find((f)=>f.id == newFinanceRecord.id)
                if(f!=undefined){
                    f.amount=newFinanceRecord.amount;
                }
            }
            
            console.log('added finance record')
        }
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
export const SetInitialFinanceDataAsync = createAsyncThunk<{data:TFinanceTrackerData,categories:TCategory[]},number>(
    'fetchFinanceData',
    async (userId:number)=>{
        const data:TFinanceTrackerData = await FetchFinanceData(userId);
        const categories:TCategory[] = await FetchCategories(data.userId);


        return {data:data,categories:categories};
    }
) 
export const {setToken,RdeleteCategory,addFinanceRecord} = financeDataSlice.actions;

export default financeDataSlice.reducer