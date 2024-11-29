import React, { forwardRef, useState, useEffect } from "react";
import styles from './tool-bar.module.css';
import { getRandomHexColor } from "@/components/lib/colorGenerator";
import { ChevronUp, Circle } from "@geist-ui/icons";
import { AddFinanceData } from "@/actions/finance-tracker/add-finance-data";
import { Modal } from "@/components/ui";
import Categories from "./Categories";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { countryByCurrencyCode } from "@/constants/country-by-currency-code";
import Currencies from "./Currencies";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import { addFinanceRecord } from "@/redux/features/financeDataSlice";

const FAdd = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
    const reduxData = useSelector((state:RootState)=> state.financeDataSlice.value)
    const dispatch = useDispatch();

    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const currencyP = searchParams.get('currency')??'USD'
    
    const [isLoading,setIsLoading] = useState(false);

    const [currency,setCurrency] = useState(currencyP);

    const categories = useSelector((state: RootState) => state.financeDataSlice.value.categories);
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryColor, setCategoryColor] = useState<string>(getRandomHexColor());

    useEffect(() => {
        if (categoryId) {
            const category = categories.find((c) => c.id === parseInt(categoryId));
            if (category) {
                setCategoryName(category.name ?? '');
                setCategoryColor(category.hexColor);
            }
        }
    }, [categoryId, categories]);
    useEffect(()=>{
        const validCurrency = countryByCurrencyCode.some((c)=>c.currency_code == currency)
        if(validCurrency){
            setCurrency(currencyP)
        }
        else{
            setCurrency('USD');
        }
    },[currencyP])

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        setIsLoading(true)

        try{
            const formData = new FormData(e.target as HTMLFormElement)
            const response = await AddFinanceData(formData)
            console.log(response);
            if(response){
                dispatch(addFinanceRecord(response));
            }
        }
        catch(error){
            console.log(error)
        }
        
        setIsLoading(false);
    };

    return (
        <div ref={ref} {...props}>
            {isLoading && <LoadingAnimation></LoadingAnimation>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="userId" readOnly value={String(reduxData.token.nameid ?? 'error')} className="hidden" />

                {/* Amount and Currency*/}
                <div className='flex justify-between py-[10px]'>
                    <Modal
                    buttonStyle="bg-l-white-300 rounded-full w-[30%] flex items-center justify-center"
                    btnContent={currency}>
                        <Currencies></Currencies>
                    </Modal>
                    <input type="number"name="amount" maxLength={20} placeholder="Amount" className={`${styles['amount-input']} ${styles.input}`} />
                    <input type="text" name="currency" readOnly value={currency} className="hidden"/>
                </div>

                {/* Income Or Expense */}
                <div className={`${styles['radio-input-container']}`}>
                    <input id="income" type="radio" name="isProfit" value='true' className="hidden" defaultChecked />
                    <label htmlFor="income" className={`${styles['radio-label']}`}> Income </label>

                    <span className="flex-grow h-[1px] bg-black mx-2"></span>
                    <span><Circle></Circle></span>
                    <span className="flex-grow h-[1px] bg-black mx-2"></span>

                    <input id="expense" type="radio" value='false' name="isProfit" className="hidden" />
                    <label htmlFor="expense" className={`${styles['radio-label']}`}> Expense </label>
                </div>

                {/* Category and Color */}
                <div className={`${styles['category-input-container']}`}>
                    <input
                        type="color"
                        value={categoryColor}
                        name="hexColor"
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
                
                {/* Submit Button */}
                <div className={`${styles['submit-button-container']}`}>
                    <button className={`${styles['submit-button']}`}>Submit</button>
                </div>

                {/* margin bot for the container used because of specific animation conditions adjust the height property to configure */}
                <div className="h-5"></div>
            </form>
        </div>
    );
});

export default FAdd;
