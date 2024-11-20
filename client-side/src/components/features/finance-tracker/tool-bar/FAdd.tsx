import React, { forwardRef } from "react";
import styles from './tool-bar.module.css'
import { getRandomHexColor } from "@/components/lib/colorGenerator";
import { ChevronDown, Circle } from "@geist-ui/icons";
import { AddFinanceData } from "@/actions/finance-tracker/add-finance-data";

const FAdd = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
    return (
        <div ref={ref} {...props}>
            <form action={AddFinanceData}>

                {/* Amount */}
                <div className='flex justify-between py-[10px]'>
                    <label htmlFor="text" className="bg-l-white-300 rounded-full w-[30%] flex items-center justify-center">KZT</label>
                    <input type="text" maxLength={20} placeholder="Amount" className={`${styles['amount-input']} ${styles.input}`} name="text" />
                </div>

                {/* Income Or Expense */}
                <div className={`${styles['radio-input-container']}`}>
                    <input id="income" type="radio" name="profit" className="hidden" defaultChecked />
                    <label htmlFor="income" className={`${styles['radio-label']}`}> Income </label>

                    <span className="flex-grow h-[1px] bg-black mx-2"></span>
                    <span><Circle></Circle></span>
                    <span className="flex-grow h-[1px] bg-black mx-2"></span>

                    <input id="expense" type="radio" name="profit" className="hidden"  />
                    <label htmlFor="expense" className={`${styles['radio-label']}`}> Expense </label>
                </div>

                {/* Category and Color */}
                <div className={`${styles['category-input-container']}`}>
                    <input type="color" defaultValue={getRandomHexColor()} className="rounded-full w-5 h-5 border-none" />
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" placeholder="food" name="category" className={`${styles.input}`}/>
                    <button className="bg-l-white-300 rounded-full p-2"><ChevronDown></ChevronDown></button>
                </div>
            </form>
        </div>
    );
});

export default FAdd;
