import { useState } from 'react'
import { Card } from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  const interests=["Webdev","Game design"]
  return (
    <div>
      <Card name={"Name"} desc={"A short description"} interests={interests}/>
    </div>
  )
}

export default App
