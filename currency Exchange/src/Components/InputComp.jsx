import { useId } from "react"

const InputComp = (currencyOptions = [], label) => {
    label = "from"
    const inputID = useId();
    const selectID = useId();
    return (
        <>
        <div className="bg-gray-200  flex justify-between  rounded-lg text-sm md:text-2xl 
        items-center p-4 gap-3 text-black border-2 " >
            <div className="flex flex-col items-start  justify-between ">
                <label className="mb-2  " htmlFor={inputID}>{label.toUpperCase()}</label>
                <input className="p-2 text-black focus:outline-none rounded-lg" type="number" id={inputID}

                />
            </div>
            <div className="flex flex-col items-start  justify-between ">
                <label className=" font-light  mb-2" htmlFor={selectID}>CURRENCY </label>
                <select id={selectID} className="text-black p-2 rounded-lg text-sm md:text-2xl">
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