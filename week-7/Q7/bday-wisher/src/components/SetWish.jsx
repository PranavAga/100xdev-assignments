

export default function SetWish({nameState, typechange}){
    function handleButton(type){
        typechange(type)
    }

    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
        }}>
            <label>Name:
                <input value={nameState.name} onChange={(e)=>nameState.setName(e.target.value)}/>
            </label>
            <button style={{margin:3}} onClick={()=>handleButton(1)}>Create Wish 1</button>
            <button style={{margin:3}} onClick={()=>handleButton(2)}>Create Wish 2</button>
            <button style={{margin:3}} onClick={()=>handleButton(3)}>Create Wish 3</button>
        </div>
    )
}