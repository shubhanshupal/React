import React from 'react'
import { useParams } from 'react-router-dom'

function Users() {
    const {userid} = useParams();
  return (
    <div className='bg-gray-500 p-4 text-3xl text-white'>Users: {userid}</div>
  )
}

export default Users