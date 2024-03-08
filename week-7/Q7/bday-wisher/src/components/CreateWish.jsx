

export default function CreateWish({name,type}){
    return(
        <>
        {
            (type!=0)&&
            <div style={{
                backgroundImage: "url('./src/assets/happy-birthday.jpeg')",
                backgroundSize: "cover",
                color:'yellow',
            }}>
                <h2>Happy Birthday!</h2>
                <h1>{name}</h1>
                <p>
                {
                    (type==1)&&<>
                    I think it's great <br/> how you used to be young.
                    </>
                }
                {
                    (type==2)&&<>
                    You might be prehistoric, <br/>but at least you're not extinct!
                    </>
                }
                {
                    (type==3)&&<>
                    Age is just a number!
                    </>
                }
                </p>
            </div>
        }
        </>
    )
}