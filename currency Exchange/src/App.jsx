import { useState } from 'react'
import './App.css'
import InputComp from './Components/InputComp'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex   min-w-max  w-100 h-100 justify-center items-center' >
      <form action="">

      <div  className='bg-white p-4 rounded-lg shadow-lg ddrop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] '>
        <InputComp />
        <button className='bg-sky-700 p-4 rounded-2xl hover:bg-sky-600 hover:outline-2 ' style={{margin:-10}}>swap</button>
        <InputComp />
        <button type='submit' className='bg-sky-700 p-4 rounded-2xl hover:bg-sky-600 mt-4'>Convert</button>
      </div>
      </form>
    </div>
    </>

  )
}

export default App
