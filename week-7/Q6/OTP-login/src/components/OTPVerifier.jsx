import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPVerifier(){
    const navigate = useNavigate();
    const numDig = 3;

    const OTP = []
    for(let i=0; i<numDig; i++){
        OTP.push(i)
    }

    var inputs = [];
    for(let i=0; i<numDig; i++){
        const [inp, setInp] = useState(); 
        
        inputs.push({
            val: inp,
            setVal: setInp
        })
    }
    console.log(inputs)

    function handleLogin(){
        for(let i=0; i<numDig; i++){
            if(OTP[i]!=inputs[i].val){
                console.log(OTP[i],inputs[i].val)
                alert('Incorrect PIN')
                navigate('/');
                return;
            }
        }
        navigate('/home')
        return;
    }

    return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}
    >
        <div style={{
            margin: 5
            }}>
        {
            inputs.map((inpstate, idx)=>{
                return <PassInp idx={idx} valstate={inpstate} nextID={idx<numDig-1?idx+1:0}/>
            })
        }
        </div>
        <button onClick={handleLogin}>Enter</button>
    </div>
        )
}

function PassInp({idx,valstate, nextID=null}){
    function handleChange(val){
        valstate.setVal(val)
        document.getElementById(nextID).focus();
        document.getElementById(nextID).select();
    }

    return (
        <input 
        style={{
            padding: 5,
            margin: 5,
            width: 20,
            height: 20,
        }}
        id={idx} value={valstate.val} onChange={(e)=>handleChange(e.target.value)}/>
    )
}