import  Authentication  from "../../components/authentication/authentication.tsx";
import  Spodify  from "../../components/spodify/spodify.tsx";

function Login(){
    return(
        <div className = "login">
            <Authentication/>
            <Spodify/>
        </div>
    )
}

export default Login;