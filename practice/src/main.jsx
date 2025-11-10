import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


const convertedElement= React.createElement('a', {href:'https/google.com', target:'_blank'}, 'click me to visit google');
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  convertedElement
)
