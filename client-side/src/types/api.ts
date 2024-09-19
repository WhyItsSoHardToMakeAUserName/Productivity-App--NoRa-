export type TFinanceData = {
    id:number,
    financeTrackerDataId:number,
    color:TColor,
    category:string,
    amount:number,
    currency:string,
    profit:boolean
}
export type TColor={
    id:number,
    financeDataId:number,
    red:number,
    green:number,
    blue:number
}

export type TFinanceTrackerData={
    userId:number,
    backgroundOpacity:number,
    borderOpacity:number,
    financeData:TFinanceData[]
}