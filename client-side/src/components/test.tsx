'use client'
import { decrement, increment, testAsync } from "@/redux/features/testSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { count } from "console";
import { useDispatch, useSelector } from "react-redux";



export default function Test(){
    const count = useSelector((state:RootState)=>state.testSlice.value);
    const dispatch = useDispatch<AppDispatch>();
  return(
    <div>
    <div>{count}</div>
    <button onClick={()=>dispatch(increment())}>increment</button>
    <button onClick={()=>dispatch(decrement())}>decrement</button>
    <button onClick={()=>dispatch(testAsync())}>async</button>
  </div>
  )
}