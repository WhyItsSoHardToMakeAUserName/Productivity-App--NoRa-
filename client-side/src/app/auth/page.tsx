import AuthForm from "@/components/auth/AuthForm";

export default function Page(){
    return(
    <div className='flex '>
        <div className='h-[95vh] w-[50vw] bg-gradient-to-tr from-black via-indigo-600 to-blue-200 rounded-3xl flex justify-center items-center flex-col'>
            <p>NoRa</p>
            <h3>Ready to Get Productive ?</h3>
            <p></p>
        </div>
        <div className="flex justify-center items-center w-[50vw] flex-col">
            <AuthForm></AuthForm>
        </div>
    </div>
    )
}