import { useId,useEffect } from "react"

const InputComp = (
    {label,
        amount,
        onAmountChange,
        onCurrencyChange,
        selectCurrency = "usd",
        currencyTypes = [],
        message,
        disabled,
        bg_color = 'white'

}
) => {
    const inputID = useId();
    const selectID = useId();
    return (
        <>
        <div className="bg-gray-200  flex justify-between  rounded-lg text-sm md:text-2xl 
        items-center p-4 gap-3 text-black border-2 " >
            <div className="flex flex-col items-start  justify-between ">

    {/* input field */}
                <label className="mb-2  " htmlFor={inputID}>{label.toUpperCase()}</label>
                <input className="p-2 text-black focus:outline-none rounded-lg" type="number" id={inputID}
                value={amount}
                placeholder={message}
                onChange={(e)=>onAmountChange?.(Number(e.target.value))}
                disabled ={disabled}
                style={{background:bg_color}}
                
                />
            </div>


{/* drop down */}
            <div className="flex flex-col items-start  justify-between ">
                <label className=" font-light  mb-2" htmlFor={selectID}>CURRENCY </label>
                <select id={selectID} className="text-black p-2 rounded-lg text-sm md:text-2xl"
                value={selectCurrency}
                onChange={(e)=>onCurrencyChange(e.target.value)}
                >
                    {
                        currencyTypes.map((current)=>(
                            <option key={current} value={current}>{current}</option>
                        ))
                    }

                </select>
            </div>
        </div>

        </>

    )


}
export default InputComp