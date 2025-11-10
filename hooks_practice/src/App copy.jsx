import { useState, useCallback , useMemo} from 'react'
import './App.css'
import ReactMemo from './components/ReactMemo.jsx'
import UseMemo from './components/UseMemo.jsx';

// ===============------------Practice of React.memo-------------==================
// 
// function App() {
//   const [count,setCounter]= useState(0);

//   const handleClick = () => {
//     setCounter(count+1)
//   }

//   return (
//     <>
//       <h1>Count:{count}</h1>
//       <button onClick={handleClick}>increase</button>
//       <br/>
//       <br/>
//       <ReactMemo buttonText="Click me" />
//     </>
//   )
// }





// ==================------------Practice of React.memo with useCallback-------------==================

// Here we are using useCallback to memoize the function being passed as prop to child component so that its reference remains same across re-renders and React.memo can work properly but when useCallback's dependency changes then also new reference of function is created and child component re-renders

// function App() {
//   const [count,setCounter]= useState(0);

//  // using useCallback to memoize the function so that its reference remains same across re renders
//   const handleClick = useCallback(() => {
//     setCounter(count+1)
//   },[count])


//   return (
//     <>
//       <h1>Count:{count}</h1>
//       <button onClick={handleClick}>increase</button>
//       <br/>
//       <br/>
//       <ReactMemo func={handleClick} buttonText="Click me" />
//     </>
//   )
// }

// =========================------------Practice of useMemo -------------===========================

function App() {
  const [count,setCount]= useState(0);

  function expensiveTask(num) {
        console.log("Computing expensive value...");
        for (let i = 0; i <= 1000000000; i++) {
            return num+2;
        }
    }
    let expensiveValue = expensiveTask(8);

  return (
    // <>
    //   <button onClick={()=>setCounter(count+1)}>increase</button>
    //   <h1>Count:{count}</h1>
    //   <div>Expensive Value: {expensiveValue}</div>
    //   <br/>
    //   <br/>
    // </>

        <div>
      <button onClick={() => setCount(count+1)}>
        Increment
      </button>

      <div>
        Count: {count}
      </div>

      <div>
        Double: {expensiveValue}
      </div>
    </div>
  )
}


// function App() {
//   const [count, setCount] = useState(0);

//   function expensiveTask(num) {
//     console.log("Inside Expensive Task");
//     for(let i=0; i<=1000000000; i++) {}
//     return num*2;
//   }
  
//   let doubleValue = expensiveTask(8);

  

//   return (
//     <div>
//       <button onClick={() => setCount(count+1)}>
//         Increment
//       </button>

//       <div>
//         Count: {count}
//       </div>

//       <div>
//         Double: {doubleValue}
//       </div>
//     </div>
//   )
// }


export default App
