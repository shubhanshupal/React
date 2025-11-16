
import './App.css'
import { useSelector,useDispatch } from 'react-redux'
import { increment,decrement,incrementByAmount } from './features/counter/CounterSlice.jsx'
import { useRef, useState } from 'react'

function App() {
  const count= useSelector((state) => state.counter.value);
  const amtref= useRef(null);
  const [amount,setAmount]= useState(0);
  const dispatch = useDispatch();


  // function handleIncrement(){
  //   dispatch(increment());
  // }

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  }
  
  const handlePayload = () => {
    dispatch(incrementByAmount(amount ? Number(amount) : 0));
  }

  

  

  return (
    <>
      <div>
       <button onClick={handleIncrement}>Increase</button>
       <br />
       <br />
        <span>Count: {count}</span>
       <br />
       <br />
       <button onClick={handleDecrement}>Decrease</button>
        <br />
        <br />

       <input type="number" value={amount} ref={amtref} onChange={(e)=>setAmount(e.target.value)}/>
       <br />
        <br />

       <button onClick={handlePayload}>payload</button>

      </div>
    </>
  )
}

export default App
