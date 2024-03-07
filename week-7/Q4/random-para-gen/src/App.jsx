import { useState } from 'react'

import genParagraph from './assets/paragraph'

function App() {
  const [len, setLen] = useState(0)
  const [para, setPara] = useState('')

  function handleGen(){
    setPara(genParagraph(len))
  }

  return (
    <>
      <input type='number' value={len} onChange={e=>setLen(Number(e.target.value))} label='Enter Number'/>
      <br/>
      <button onClick={()=>handleGen()}>Generate!</button>
      <h2>Paragraph:</h2>
      <p>{para}</p>
    </>
  )
}

export default App
