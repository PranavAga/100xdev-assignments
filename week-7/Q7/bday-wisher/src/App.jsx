import { useState } from 'react'
import SetWish from './components/SetWish'
import CreateWish from './components/CreateWish'

function App() {
  const [name, setName] = useState(null)
  const [type, setType] = useState(0)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <SetWish nameState ={{name,setName}} typechange={setType}/>
      <div>
        {
          (name!=null)&&
          <CreateWish name ={name} type={type}/>
        }
      </div>
    </div>
  )
}

export default App
