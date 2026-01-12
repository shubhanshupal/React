import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink as Navlink } from 'react-router-dom'

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  // console.log(pastes);

  const [searchTerm, setSearchTerm] = React.useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDelete = (paste_id) => {
    console.log('Deleting paste with id:', paste_id);
    dispatch(removeFromPaste(paste_id));
  }

  console.log(filteredData);
  return (
    <div>
      <input
      className='px-2 py-1 border-2 border-gray-300 rounded-md mb-4 min-w-[600px] h-12'type='search' placeholder='Search here' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>

      <div>
        {filteredData.length > 0 && filteredData.map((paste)=>{
          return(
            <div key={paste.id} className='border-2 border-gray-300 rounded-md p-4 mb-4 min-w-[580px]'>
              <h2 className='text-2xl font-bold mb-2'>{paste.title}</h2>
              <p className='whitespace-pre-wrap'>{paste.content}</p>
              <div className='mt-4 flex gap-2 place-content-center'>
                <button>
                  {/* <a href={`/?pasteId=${paste.id}`}>
                  Edit
                  </a> */}
                  <Navlink to={`/?pasteId=${paste.id}`}>Edit</Navlink>
                </button>
                <button>
                  {/* <a href={`/paste/${paste.id}`}>
                    View
                  </a> */}
                  <Navlink to={`/paste/${paste.id}`}>View </Navlink>
                </button>
                <button onClick={()=> handleDelete(paste?.id)}>
                  Delete
                </button>
                <button onClick={()=>{
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to clipboard");
                }}>
                  Copy
                </button>
                <button>
                  Share
                </button>
              </div>
              <div>
                  {paste.createdAt} <br />
                  {paste?.id}
                </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Paste