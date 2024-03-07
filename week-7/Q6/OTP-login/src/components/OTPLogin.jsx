import OTPVerifier from "./OTPVerifier"

export default function OTPLogin(){

    return(
        <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: 1,
            borderStyle: 'groove',
            borderRadius: 5,
            padding: 10
        }}
        >
            <h1>Login</h1>
            <OTPVerifier/>
        </div>
    )
}