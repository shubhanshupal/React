import { useState, useCallback , useMemo} from 'react'
import './App.css'
import ReactMemo from './components/ReactMemo.jsx'
import UseMemo from './components/UseMemo.jsx';
import UseEffect from './components/UseEffect.jsx';

// ===============------------Practice of React.memo-------------==================
// It prevents re-rendering of child component if props passed to it remain same between re-renders of parent component


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

// function App() {
//   return (
//     <>
//       <UseMemo />
//     </>
//   )
// }



//=========================-------------Practice of useEffect-----===========================

function App() {
  return (
    <>
      <UseEffect />
    </>
  )
}

export default App
