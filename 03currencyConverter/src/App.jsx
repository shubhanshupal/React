import { useState } from 'react'
import './App.css'
// import InputType from './components/InputType.jsx'
import {InputType} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  // const [count, setCount] = useState(0)
  const [amount, setAmount] = useState(0);
  const [from, setFrom ] = useState('usd');
  const [to, setTo ] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);
  
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap=() =>{
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount)
    setAmount(convertedAmount);

    if(from!==0 && to!==0){
      setConvertedAmount( (amount * currencyInfo[to]) );
    }
  }

  const handelConvert = () => {
    const rate = currencyInfo[to];
    if(rate){
      setConvertedAmount(amount * rate);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={(e) => {e.preventDefault()
          handelConvert();
        }}>
          <div className='h-screen w-screen bg-gray-200 flex flex-col items-center justify-center gap-2 bg-[url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYW4lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")] bg-cover'>

            <div className='h-[450px] w-[700px] border rounded flex flex-col justify-between relative p-6 backdrop-blur-md bg-white/30'>

              <InputType 
              label="From" 
              amount={amount}
              currencyOptions={options} 
              onCurrencyChange={(currency)=>setFrom(currency)} 
              selectCurrency={from}
              onAmountChange={(amount)=>setAmount(amount)}/>
              

              <InputType 
              label="To" 
              amount={convertedAmount}
              currencyOptions={options} 
              onCurrencyChange={(currency)=>setTo(currency)} 
              selectCurrency={to}
              onAmountChange={(amount)=>setAmount(amount)}/>

              <div className='absolute bg-blue-500 p-2 rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><button className='text-lg text-white'onClick={swap}>Swap</button></div>


            </div>

            
            <button type="submit" className="w-[700px] bg-blue-600 text-white px-4 py-3 rounded-lg" onClick={handelConvert}>Convert {from} to {to}
            </button>

          </div>
        </form>
      </div>
    </>
  )
}

export default App;
