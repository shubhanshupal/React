import React from 'react'
import { useState,useMemo } from 'react'

function UseMemo(props) {
    const [count,setCounter]= useState(0);

  function expensiveTask(num) {
        console.log("Computing expensive value...");
        for (let i = 0; i <= 1000000000; i++) {
        }
        return num+2;
    }
    let number = 10;

    //if we don't use useMemo here then on every re-render of App component expensiveTask function will be called and it will take time to compute the value making the app slow.

    // let expensiveValue = expensiveTask(number);

    //using useMemo to memoize the computed value so that it only recomputes when 'number' changes
    let expensiveValue = useMemo(()=> expensiveTask(number),[number]);


  return (
    <>
      <button onClick={()=>setCounter(count+1)}>increase</button>
      <h1>Count:{count}</h1>
      <div>Expensive Value: {expensiveValue}</div>
      <br/>
      <br/>
    </>

  )
}

export default UseMemo