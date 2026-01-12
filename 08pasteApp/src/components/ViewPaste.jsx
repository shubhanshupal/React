import React from 'react'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';


function ViewPaste() {
  const allPastes = useSelector((state) => state.paste.pastes); 
  console.log('All Pastes in ViewPaste:', allPastes);
    const {id}= useParams();
    const paste = allPastes.find((p) => p.id === id);

    
  return (

    <>
    <div className='w-[600px] mx-auto mt-10 flex flex-row gap-4 justify-between'>
      <input className="w-[68%] border-1 black rounded p-2" type="text" 
      placeholder='Enter title here'
      disabled
      value={paste.title}
      />

      
    </div>
    <div className='w-[600px] mx-auto mt-5'>
      <textarea className='w-full h-[400px] border-1 black rounded p-2'
      placeholder='Enter your paste here'
      disabled
      value={paste.content}
      ></textarea>
    </div>  
  
  </>
  )
}

export default ViewPaste