import React, { forwardRef, useState, useEffect } from "react";
import styles from './tool-bar.module.css';
import { getRandomHexColor } from "@/components/lib/colorGenerator";
import { ChevronUp, Circle } from "@geist-ui/icons";
import { AddFinanceData } from "@/actions/finance-tracker/add-finance-data";
import { Modal } from "@/components/ui";
import Categories from "./Categories";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import rgbToHex from "@/components/lib/rgbToHex";

const FAdd = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const categories = useSelector((state: RootState) => state.financeDataSlice.value.categories);

    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryColor, setCategoryColor] = useState<string>(getRandomHexColor());

    useEffect(() => {
        if (categoryId) {
            const category = categories.find((c) => c.id === parseInt(categoryId));
            if (category) {
                setCategoryName(category.name ?? '');
                setCategoryColor(rgbToHex(
                    category.red ?? 0,
                    category.green ?? 0,
                    category.blue ?? 0
                ));
            }
        }
    }, [categoryId, categories]);

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

                    <input id="expense" type="radio" name="profit" className="hidden" />
                    <label htmlFor="expense" className={`${styles['radio-label']}`}> Expense </label>
                </div>

                {/* Category and Color */}
                <div className={`${styles['category-input-container']}`}>
                    <input
                        type="color"
                        value={categoryColor}
                        onChange={(e) => setCategoryColor(e.target.value)}
                        className="rounded-full min-w-5 min-h-5 w-5 h-5 border-none"
                    />
                    <label htmlFor="category-amount">Category</label>
                    <input
                        type="text"
                        id="category"
                        placeholder="food"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        name="category"
                        className={`${styles.input}`}
                    />
                    <Modal
                        buttonStyle={"bg-l-white-300 rounded-full p-2"}
                        btnContent={<ChevronUp></ChevronUp>}
                    >
                        <Categories></Categories>
                    </Modal>
                </div>

                <div className={`${styles['submit-button-container']}`}>
                    <button className={`${styles['submit-button']}`}>Submit</button>
                </div>
                <div className="h-5">
                    {/* margin bot for the container used because of specific animation conditions adjust the height property to configure */}
                </div>
            </form>
        </div>
    );
});

export default FAdd;
