import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'

function Component3() {
    //5 Consume the context value
    const user = useContext(UserContext);
    console.log(user.name);
  return (
    <div>User: {user.name}</div>
  )
}

export default Component3