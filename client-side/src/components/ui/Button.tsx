export default function RoundButton({children}:any){
    return(
        <button className="min-w-8 w-8 h-8 bg-slate-300 rounded-full text-black hover:bg-slate-500 duration-200">
            {children}
        </button>
    )
}