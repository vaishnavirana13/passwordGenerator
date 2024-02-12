import { useState , useCallback ,useEffect, useRef} from 'react'


import React from 'react';

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed ,setNumberAllowed] =useState(false)
  const [charAllowed ,setCharAllowed] =useState(false)

  const [password , setPassword] =useState("")

  // use ref hook 
   const passwordRef =useRef(null)

  const passwordGenerator = useCallback( ()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(charAllowed) str += "$&+,:;=?@#|'<>.^*()%!-~"
    if (numberAllowed) str += "0123456789"
   

     
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() *str.length + 1)
      pass += str.charAt(char)
      
    }
setPassword(pass)

  } ,[length ,charAllowed,numberAllowed,setPassword]) 
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current?.setSelectionRange(0,15);
    window.navigator.clipboard.writeText(password)
  } ,[password] )



  useEffect (() => {
    passwordGenerator()
  } ,[length ,numberAllowed , charAllowed , passwordGenerator])


  return (
    <>
   <div className=' object-center w-full max-w-md mx-auto shadow-md text-center rounded-lg px-4 my-8 text-gray-200 bg-slate-400 my-5 '> 
   <h1 className='flex  rounded-lg overflow-hidden mb-4 text-slate-950  p-6 '> Password Generator</h1>
   <div className='flex text-black rounded-lg overflow-hidden mb-4 py-7  '>
    <input type="text" 
    value={password}
    className='outline-none w-full py-1 px-3 rounded'
    placeholder='password'
    readOnly
    ref={passwordRef}
    />
    <button
    onClick={copyPasswordToClipboard}
     className='outline-none bg-sky-500 text-orange-50 px-3 py-0.5 shrink-0 rounded'> Copy</button>
   </div>
   <div className=' flex text-sm gap-x-2 p-4'>
    <div className=' flex items-center gap-x-1 '>
      <input type="range" 
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e) => { setLength(e.target.value) }}
      />
      <label > Length {length}</label>
    </div>
    <div className=' flex items-center gap-x-1 '>
      <input type="checkbox"
       defaultChecked = {numberAllowed}
       id='numberiInput'
       onChange={()=>{
        setNumberAllowed((prev) => !prev)
       }}
      />
      <label htmlFor='numberInput'>Numbers</label>
    </div>
    <div className=' flex items-center gap-x-1 '>
      <input type="checkbox"
       defaultChecked = {charAllowed}
       id='characterInput'
       onChange={()=>{
        setCharAllowed((prev) => !prev)
       }}
      />
      <label htmlFor='characterInput'>Characters</label>
    </div>
   </div>
   </div>
    </>
  )
}

export default App
