

export function Card(props){


    return(
    <div
    style={{
        borderStyle:"solid",
        borderColor:"grey",
        borderRadius:5,
        padding: 10,
        margin:5,
        
    }}
    >
        <h1>
            {props.name}
        </h1>
        <p>
            {props.desc}
        </p>
        <h2>Interests:</h2>
        <ul>
            {
                props.interests.map((elem)=>{                    
                    return <li>{elem}</li>
                })
            }
        </ul>
        <button onClick={()=>{
            window.location.href="https://www.linkedin.com/"
        }}
        >
            LinkdIn
        </button>
        <button onClick={()=>{
            window.location.href="https://www.x.com/"
        }}>
            X
        </button>

    </div>
    
    )
}