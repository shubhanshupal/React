// We are using React.memo to memoize child component so that it only re-renders when its props change
// If props remain same between re-renders of parent component then child component will not re-render

import React from 'react';
import { useMemo, useCallback } from 'react'

const ReactMemo = React.memo((props) => {
    console.log("child component called");
  return (
    <div>
      <button >{props.buttonText}</button>
    </div>
  );
})


//Uncomment the below code and comment the above code to see the implementation of useCallback with React.memo

//memoization will not work here as funtion is passes as prop and function is reference type whenever parent re renders new reference of function is created and memoization works on non changing props only
// const ReactMemo = React.memo((props) => {
//     console.log("child component called");
//   return (
//     <div>
//       <button onClick={props.func}>{props.buttonText}</button>
//     </div>
//   );
// })


export default ReactMemo;