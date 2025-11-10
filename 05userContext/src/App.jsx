import { useState } from 'react'
import { createContext } from 'react'
import Component1 from './components/Component1'
import './App.css'

const UserContext = createContext();
//1 Create User Context


function App() {

  const [user, setUser] = useState({name:"somu"});
  return (
    <>
 {/* 2 Create Provider using the created context */
  /* 3 wrap all the child components within Provider */
  /* 4 provide a value to the provider  */}
      <h2>hello somu</h2>
      <UserContext.Provider value={user}>
        <Component1/>
      </UserContext.Provider>
    </>
  )
}

export default App
export {UserContext}
