export default function RoundButton({children}:any){
    return(
        <button className="min-w-8 w-8 h-8 bg-slate-300 rounded-full text-black hover:bg-slate-500 duration-200">
            {children}
        </button>
    )
}
export default function Button({children}:any){
    return(
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{children}</button>
    );
}