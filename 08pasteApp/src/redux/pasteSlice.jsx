import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : []
} 
export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state,action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("Paste added successfully");
    },
    updateToPaste: (state,action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(paste => paste.id === updatedPaste.id);
      if(index >= 0){
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
      
    }, 
    resetAllPaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes have been removed");
      
    },
    removeFromPaste: (state, action) => { 
      const id = action.payload;
      state.pastes = state.pastes.filter(paste => paste.id !== id);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("Paste removed successfully");
      
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer