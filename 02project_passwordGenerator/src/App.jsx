import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState('')
  
  let copyRef = useRef(null);
  const generatePassword = useCallback(() => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) {
      chars += '0123456789'
    }
    if (includeSymbols) {
      chars += '!@#$%^&*()_+[]{}|;:,.<>?'
    }
    
    let generatedPass = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      generatedPass += chars[randomIndex]
    }
    setPassword(generatedPass)
  }, [length, includeNumbers, includeSymbols])


  useEffect(() => {
    generatePassword()
  }, [length,includeNumbers, includeSymbols])

  const handle_copy = () => {
    window.navigator.clipboard.writeText(password);
    copyRef.current.innerText = "copied";
    setTimeout(() => {
      copyRef.current.innerText = "copy";
    }, 1000);
  }
  return (
    <>
      <h1 className='text-white text-xl'> Password Generator
      </h1>
      <div className='w-80 h-full  bg-gray-700 rounded'>
        <input type="text" value={password} readOnly
        className='bg-white'/>
        <button onClick={handle_copy} ref={copyRef}>copy</button>
        <br />
        <input type="range" min="4" max="20" value={length} 
        onChange={(e) => setLength(e.target.value)} />
        <span>{length}</span>
        <br />
        <label>
          <input type="checkbox" 
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)} />
          Include Numbers
        </label>
        <br />
        <label>
          <input type="checkbox" 
          checked={includeSymbols}
          onChange={() => setIncludeSymbols(!includeSymbols)} />
          Include Symbols
        </label>
        <br />
      </div>
    </>
  )
}

export default App
