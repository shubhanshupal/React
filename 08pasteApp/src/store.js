import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice.jsx'

export default configureStore({
  reducer: {
    paste:pasteReducer}
})