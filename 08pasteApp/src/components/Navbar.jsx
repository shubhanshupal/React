import React from 'react'
import { NavLink as Navlink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-[600px] flex place-content-evenly bg-gray-800 text-white p-4'>
      <Navlink to='/'>
        Home
      </Navlink>
      <Navlink to='/paste'>
        paste
      </Navlink>
      {/* <Navlink to='/paste/id'>
        paste:id
      </Navlink> */}
    </div>
    
  )
}

export default Navbar