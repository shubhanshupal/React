import React from 'react'
import {useParams} from 'react-router-dom'

function ViewPaste() {
    const {id}= useParams();
  return (
    <div>ViewPaste :{id}</div>
  )
}

export default ViewPaste