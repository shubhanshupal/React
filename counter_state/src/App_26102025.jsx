import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    Count :{count}
    <br />
    <br />
    <button onClick={()=> setCount(count<=9?count+1:count)}>Increase</button>
    <br />
    <br />
    <button onClick={()=> setCount(count>=1?count-1:count)}>Decrease</button>
      
    </>
  )
}

export default App
