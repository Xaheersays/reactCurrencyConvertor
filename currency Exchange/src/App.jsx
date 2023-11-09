import { useState } from 'react'
import './App.css'
import InputComp from './Components/InputComp'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* main body div */}
      <div className='w-full bg-slate-900 h-[100vh] p-2 flex flex-col items-center justify-center'>
        {/* for centring content and blur */}
        <div className='flex flex-col items-center  justify-center  border-white  border border-gray-60 rounded-lg  bg-white/30  max-w-4xl  w-full pt-10 pb-10' > 

          

            <InputComp/>
            <button className='bg-sky-700 hover:bg-sky-600 p-4 text-white rounded-lg z-10 border-2 border-gray-400' style={{margin:-10}}>Swap</button>
            <InputComp/>
            <button className='bg-sky-700 p-4 w-44 rounded-lg text-white hover:bg-sky-600 mt-10 shadow-lg font-semibold'>CONVERT</button>


        </div>
      </div>
  
    </>

  )
}

export default App
