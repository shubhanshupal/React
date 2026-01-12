import React, {use, useEffect, useState}from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

function Home() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  // console.log('All Pastes:', allPastes);

  useEffect(()=>{
    if(pasteId){
      const matchingPaste = allPastes.find((p)=> pasteId === p.id);
      if(matchingPaste){
        setTitle(matchingPaste.title);
        setValue(matchingPaste.content);
      }
    }
  },[pasteId])


function createPaste(){

  const paste={
    title: title,
    content: value,
    id: pasteId ? pasteId : new Date().getTime().toString(36),
    createdAt: new Date().toISOString(),
  }

  if(pasteId){
    // update paste
    dispatch(updateToPaste(paste));
  } else {
    // create paste
    dispatch(addToPaste(paste));
  }

  // after creating or updating clear the fields
  setTitle('');
  setValue('');
  setSearchParams({});
}

  return (
    <>
    
    <div className='w-[600px] mx-auto mt-10 flex flex-row gap-4 justify-between'>
      <input className="w-[68%] border-1 black rounded p-2" type="text" 
      placeholder='Enter title here'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}/>

      <button className='bg-blue-500 text-white p-2 rounded' onClick={createPaste}>
        {
         pasteId ? "Update Paste" : "Create My Paste"
        }
        </button>
    </div>
    <div className='w-[600px] mx-auto mt-5'>
      <textarea className='w-full h-[400px] border-1 black rounded p-2'
      placeholder='Enter your paste here'
      value={value}
      onChange={(e)=>setValue(e.target.value)}></textarea>
    </div>  
  
  </>
    
  )
}

export default Home