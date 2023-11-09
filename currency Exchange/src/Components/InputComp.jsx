import { useId } from "react"

const InputComp = (currencyOptions = [],label)=>{
    label = "from"
    const inputID = useId();
    const selectID = useId();
    return (
        <>
        <div className="bg-gray-400 p-5 flex justify-between gap-44 rounded-lg"> 
            <div className="flex flex-col items-start gap-2">
                <label className="text-2xl  text-gray-700" htmlFor={inputID}>{label.toUpperCase()}</label>
                <input className="p-2 text-black focus:outline-none" type="number" id={inputID}
                
                />
            </div>

            <div className="flex flex-col items-start gap-2 opacity-100">
                <label className="text-2xl font-light text-slate-700" htmlFor={selectID}>CURRENCY TYPE</label>
                <select id={selectID} className="text-black">
                    <option value="1">zaheer</option>
                    <option value="1">zaheer</option>
                    <option value="1">zaheer</option>
                </select>
            </div>
        </div>

        </>

    )


}
export default InputComp