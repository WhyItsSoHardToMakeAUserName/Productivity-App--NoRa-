'use client'
import { RootState } from "@/redux/store"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux"

type props = {
    onCurrencySelect: Dispatch<SetStateAction<string | null>>;
    setIsProfit: Dispatch<SetStateAction<boolean | null>>;
};

export default function Filters({ onCurrencySelect, setIsProfit }: props) {
    const Currencies = useSelector((state: RootState) => state.financeDataSlice.value.currencies);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
    const [selectedProfit, setSelectedProfit] = useState<boolean | null>(null);

    useEffect(()=>{
       setSelectedCurrency(Currencies[0]) 
    },[Currencies])

    return (
        <div className="mt-10 md:mt-0 w-full flex flex-col items-center justify-center">
            <div className="flex gap-2 mb-3">
                {Currencies.map((c) =>
                    <button
                        key={c}
                        onClick={() => {
                            setSelectedCurrency(c);
                            onCurrencySelect(c);
                        }}
                        className={`rounded-full px-5 py-1 ${selectedCurrency === c ? 'bg-gray-300' : 'bg-l-white-200'} hover:bg-l-white-300 duration-500`}
                    >
                        {c}
                    </button>
                )}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        setSelectedProfit(true);
                        setIsProfit(true);
                    }}
                    className={`rounded-full px-5 py-1 ${selectedProfit === true ? 'bg-gray-300' : 'bg-l-white-200'} hover:bg-l-white-300 duration-500`}
                >
                    Income
                </button>
                <button
                    onClick={() => {
                        setSelectedProfit(null);
                        setIsProfit(null);
                    }}
                    className={`rounded-full px-5 py-1 ${selectedProfit === null ? 'bg-gray-300' : 'bg-l-white-200'} hover:bg-l-white-300 duration-500`}
                >
                    Overall
                </button>
                <button
                    onClick={() => {
                        setSelectedProfit(false);
                        setIsProfit(false);
                    }}
                    className={`rounded-full px-5 py-1 ${selectedProfit === false ? 'bg-gray-300' : 'bg-l-white-200'} hover:bg-l-white-300 duration-500`}
                >
                    Expense
                </button>
            </div>
        </div>
    );
}
