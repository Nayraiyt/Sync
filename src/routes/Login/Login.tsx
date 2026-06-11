import  Authentication  from "./authentication/authentication.tsx";
import "./Login.css";

import catCloud1 from "../../assets/cat-cloud-1.png";
import catCloud2 from "../../assets/cat-cloud-2.png";
import catCloud3 from "../../assets/cat-cloud-3.png";
import genCloud1 from "../../assets/general-cloud-1.png";
import genCloud2 from "../../assets/general-cloud-2.png";

function Login(){
    return(
        <div className = "login">
            <div className="clouds">
                <img className="cloud cat-cloud-1" src={catCloud1} alt="cute cat cloud" />
                <img className="cloud cat-cloud-2" src={catCloud2} alt="cute cat cloud" />
                <img className="cloud cat-cloud-3" src={catCloud3} alt="cute cat cloud" />
                <img className="cloud gen-cloud-1" src={genCloud1} alt="another normal cloud" />
                <img className="cloud gen-cloud-2" src={genCloud2} alt="normal cloud" />
            </div>
            <div className="bird bird-1"></div>
            <div className="bird bird-2"></div>
            <div className="bird bird-3"></div>
            
            <Authentication/>
            <div className = "logo"></div>
        </div>
    )
}

export default Login;