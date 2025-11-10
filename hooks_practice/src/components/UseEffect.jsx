import React from 'react'
import { useState,useEffect } from 'react'


//=========================-------------Practice of useEffect-----===========================

//Fist variation: useEffect without dependency array, it runs after every render of component

// function UseEffect() {
//     useEffect(()=>{
//         console.log("UseEffect called");
//         alert("UseEffect called");
//     });
//   return (
//     <div>UseEffect</div>
//   )
// }

// export default UseEffect


// second variation: useEffect with cleanup function
function UseEffect() {
    const [count,setCounter]= useState(0);

    const handleClick = () => {
    setCounter(count+1)
  }

    useEffect(()=>{
        console.log("UseEffect called");
        alert("UseEffect called");

        //cleanup function
        return ()=>{
            console.log("Cleanup function called");
            alert("Cleanup function called");
        }
    },[]);
  return (
    <div>
       UseEffect
       <h1>count:{count}</h1>
       <button onClick={handleClick}>increase</button>
    </div>
  )
}

export default UseEffect
