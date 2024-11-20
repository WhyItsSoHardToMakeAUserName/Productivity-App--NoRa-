import { JWTPayload } from "jose"

export type TFinanceRecord = {
    id:number,
    userId:number,
    categoryId:number,
    amount:number,
    currency:string,
    profit:boolean
}

export type TFinanceTrackerData={
    userId:number,
    backgroundOpacity:number,
    borderOpacity:number,
    financeRecords:TFinanceRecord[]
}

export type TCategory={
    id:number,
    name:string,
    red:number,
    green:number,
    blue:number,
}

export interface CustomJWTPayload extends JWTPayload{
    name: string;
    nameid: string;
    email: string;
}