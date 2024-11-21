import { RootState } from "@/redux/store"
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux"

export default function Categories({hide}:any){
    const reduxData = useSelector((state:RootState)=> state.financeDataSlice.value)
    const router = useRouter();
    const searchParam = useSearchParams();

    const setCategoryIdSearchParam = (id:number)=>{
        const newSearchParams = new URLSearchParams(searchParam);
        newSearchParams.set('categoryId',id.toString())
        router.replace(`?${newSearchParams}`);
    }

    return(
        <div>
            <div className="">
                {
                    reduxData.categories.map((c)=>(
                        <div className="flex items-center mb-3 gap-3" key={c.id}>
                            <div onClick={()=>{
                                setCategoryIdSearchParam(c.id)
                                hide()
                                }}  className="w-[90%] flex pl-2 py-2 rounded-full cursor-pointer bg-white hover:bg-l-white-200 active:bg-l-white-300 overflow-y-scroll gap-3 items-center">
                                <div className="w-5 h-5 rounded-full" style={{backgroundColor:`rgb(${c.red},${c.green},${c.blue})`}}></div>
                                <p>{c.name}</p>
                            </div>
                            <button className="right-0 bg-red-400 h-10 w-10 rounded-full text-white">x</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}