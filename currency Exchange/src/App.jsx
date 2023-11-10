import { useState } from 'react'
import './App.css'
import InputComp from './Components/InputComp'
import FetchData  from './Hooks/FetchData';
function App() {
  const [amount, setAmount] = useState('');
  const [from,setFrom] = useState("usd");
  const [to,setTo] = useState("inr")
  const [convertedAmount,setConvertedAmount]=useState('')

  const data = FetchData(from)
  const options = Object.keys(data)

  const swap=()=>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const Convert=()=>{
      setConvertedAmount(amount*data[to])
  }

 


  return (
    <>
    {/* main body div */}
      <div className='w-full bg-slate-900 h-[100vh] p-2 flex flex-col items-center justify-center'>
        {/* for centring content and blur */}
        <div className='flex flex-col items-center  justify-center  border-white  border border-gray-60 rounded-lg  bg-white/30  max-w-4xl  w-full pt-10 pb-10' > 

          

            <InputComp 
            label="From"
            currencyTypes={options}
            onCurrencyChange={(currency)=>setFrom(currency)}
            onAmountChange={(amount)=>setAmount(amount)}
            selectCurrency = {from}
            amount={amount}
            message = {"enter amount"}
            
            />
            <button className='bg-sky-700 hover:bg-sky-600 p-4 text-white rounded-lg z-10 border-2 border-gray-400  font-semibold' style={{margin:-10}}
            onClick={swap}
            >Swap</button>
            <InputComp label="To"
            currencyTypes={options}
            onCurrencyChange={(currency)=>setTo(currency)}
            selectCurrency={to}
            amount={convertedAmount}
            message = {"results"}
            disabled = {true}
            bg_color  = {'white'}

             />
            <button className='bg-sky-700 p-4 w-44 rounded-lg text-white hover:bg-sky-600 mt-10 shadow-lg font-semibold' onClick={Convert}>CONVERT {from} - {to}</button>

        </div>
      </div>
  
    </>

  )
}

export default App
