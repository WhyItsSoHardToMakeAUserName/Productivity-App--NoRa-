import { Register } from "@/api/AuthAPI";
import { register } from "module";

export default function Page(){
    return(
    <div className='flex '>
        <div className='h-[95vh] w-[50vw] bg-gradient-to-tr from-black via-indigo-600 to-blue-200 rounded-3xl flex justify-center items-center flex-col'>
            <p>NoRa</p>
            <h3>Ready to Get Productive ?</h3>
            <p></p>
        </div>
        <div>
            <form action={Register}>
                <input type="text" name="UserName"/>
                <label htmlFor="UserName">username</label>

                <input type="text" name="Password"/>
                <label htmlFor="Password">password</label>

                <input type="text" name="Email"/>
                <label htmlFor="Email">email</label>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    )
}