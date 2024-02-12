import { useState } from 'react'

const white='#ffffff';
const black='#0a0a0a';

function App() {
  const colors=[
    {name: 'Default', value:white},
    {name: 'Red', value:'#fa0707'},
    {name: 'Green', value:'#07fa24'},
    {name: 'Blue', value:'#07b1fa'},
    {name: 'Black', value:black}
  ]

  const [bgcolor,setBgcolor]=useState(colors[1].value);
  
  function handleBgchange(code){
    console.log(code, bgcolor)
    setBgcolor(code)
  }

  return (
    <div style={{
      backgroundColor: bgcolor,
      width: '100vw',
      height: '100vw',
      position: 'absolute'
    }}>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '40%',
        
      }}>
        {colors.map((elem)=>{
          return <button style={{
            backgroundColor: elem.value,
            color: elem.value==black?white:black,
            borderColor: bgcolor==black?white:black,
          }}
          onClick={()=>handleBgchange(elem.value)}>{elem.name}</button>
        })}
      </div>
    </div>
  )
}

export default App
