'use client'

import { FetchFinanceData } from "@/actions/finance-tracker/fetch-finance-data"
import { FetchCategories } from "@/actions/finance-tracker/get-categories"
import { FinanceRecordUpdateDTO, TCategory, TFinanceRecord, TFinanceTrackerData } from "@/types"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { JWTPayload } from "jose"

export interface financeDataState{
    value:{data:TFinanceTrackerData,categories:TCategory[],token:JWTPayload,currencies:string[]}
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
        token:{},
        currencies:[],
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
        RdeleteRecord:(state,action)=>{
            const recordId = action.payload;
            state.value.data.financeRecords = state.value.data.financeRecords.filter(
                (f)=> f.id != recordId
            );
            console.log('deleting from rstore ')
        },
        RUpdateRecord:(state,action:PayloadAction<FinanceRecordUpdateDTO>)=>{
            const record = state.value.data.financeRecords.find((f)=>f.id == action.payload.id);

            console.log(record)

            if(record){
                record.amount = action.payload.amount
            }
            
            console.log("update value")
        },
        addFinanceRecord:(state,action:PayloadAction<TFinanceRecord>)=>{   
            const newFinanceRecord = action.payload;

            const categories = state.value.categories
            const financeRecords = state.value.data.financeRecords
            const currencies = state.value.currencies

            const categoryIsUnique = !categories.some((c)=>c.id == newFinanceRecord.category.id);
            const recordIsUnique = !financeRecords.some((f)=>f.id == newFinanceRecord.id);
            const currencyIsUnique = !currencies.some((c)=>c == newFinanceRecord.currency)


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

            if(currencyIsUnique){
                currencies.push(newFinanceRecord.currency)
            }
            
            console.log('added finance record')
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(SetInitialFinanceDataAsync.pending,()=>{
            console.log('loading finance data')
        }),
        builder.addCase(SetInitialFinanceDataAsync.fulfilled,(state,action)=>{
            state.value.data = action.payload.data;
            state.value.categories = action.payload.categories;
            state.value.currencies = action.payload.currencies;
        })
    }
})
export const SetInitialFinanceDataAsync = createAsyncThunk<{data:TFinanceTrackerData,categories:TCategory[],currencies:string[]},number>(
    'fetchFinanceData',
    async (userId:number)=>{
        const data:TFinanceTrackerData = await FetchFinanceData(userId);
        const categories:TCategory[] = await FetchCategories(data.userId);
        const currencies:string[] = Array.from(new Set(data.financeRecords.map((r)=>r.currency).filter(currency => currency)));

        return {data:data,categories:categories,currencies:currencies};
    }
) 
export const {setToken,RdeleteCategory,RdeleteRecord,addFinanceRecord,RUpdateRecord} = financeDataSlice.actions;

export default financeDataSlice.reducer