//this document told us how to update state based on previous state value and what happens if we don't do it the correct way

import { useState } from 'react'
import './App.css'

function App() {

  const [counter, setCounter]  = useState(15)

  //let counter = 15

  const addValue = () => {
    //counter = counter + 1

    //setCounter(counter + 1) //these line will get batched together and only last one will be considered
    //setCounter(counter + 1)
    //setCounter(counter + 1)
    //setCounter(counter + 1)

    setCounter((prevCounter) => prevCounter + 1)// correct way to update state based on previous state
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
    // setCounter(prevCounter => prevCounter + 1 )
    // setCounter(prevCounter => prevCounter + 1)
    // setCounter(prevCounter => prevCounter + 1)
    
  }

  const removeValue = () => {
    setCounter(counter - 1)
  }
  
  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter value: {counter}</h2>

      <button
      onClick={addValue}
      >Add value {counter}</button> 
      <br />
      <button
      onClick={removeValue}
      >remove value {counter}</button>
      <p>footer: {counter}</p>
    </>
  )
}

export default App