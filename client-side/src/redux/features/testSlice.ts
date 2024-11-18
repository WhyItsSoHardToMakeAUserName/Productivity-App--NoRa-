'use client'

import { FetchFinanceData } from "@/actions/finance-tracker/fetch-finance-data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface TestState {
    value:string
}
const initialState:TestState={
    value:'hi'
}

const testSlice = createSlice({
    name:"test",
    initialState,
    reducers:{
        increment:(state)=>{
            state.value += 1;
        },
        decrement:(state)=>{
            state.value += 'hhi';
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(testAsync.pending,()=>{
            console.log('pending')
        })
        builder.addCase(testAsync.fulfilled,(state,action)=>{
            state.value+=action.payload
        })
    }
});
export const testAsync = createAsyncThunk(
    "test/testAsync",
    async ()=>{
        return (await FetchFinanceData()).toString();
    }
)
export const {increment,decrement} = testSlice.actions

export default testSlice.reducer;