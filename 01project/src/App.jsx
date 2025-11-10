import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [bg_color, setBgColor] = useState('black')

  return (
    // <>
      <div className={`h-screen w-screen bg-${bg_color} relative`}>
        <div className='h-15 absolute bottom-20 w-[80%] bg-transparent border-1 rounded left-1/2 -translate-x-1/2 flex justify-center items-center justify-between p-4 gap-4'> 
          <button className='bg-red-400 p-2 rounded-md' onClick={()=> setBgColor("red-400")}>Red</button>
          <button className='bg-green-400 p-2 rounded-md' onClick={()=> setBgColor("green-400")}>Green</button>
          <button className='bg-blue-400 p-2 rounded-md' onClick={()=> setBgColor("blue-400")}>Blue</button>
          <button className='bg-yellow-400 p-2 rounded-md' onClick={()=> setBgColor("yellow-400")}>Yellow</button>
          <button className='bg-violet-200 p-2 rounded-md' onClick={()=> setBgColor("violet-200")}>Lavender</button>
        </div>
      </div>
    // </>
  )
}

export default App
