import { useEffect, useState } from "react"

function Spodify() {
    const CLIENT_ID = "+++++++++++++++++++++++++++++"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            const tokenParam = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))
            if (tokenParam) {
                token = tokenParam.split("=")[1]

                window.location.hash = ""
                window.localStorage.setItem("token", token)
            }
        }

        setToken(token || "")

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return (
        <div className="spodify">
            <header className="spodify-">
                <h1>Sign into your Spodify Account</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Sign in</a>
                    : <button onClick={logout}>Logout</button>}
            </header>
        </div>
    );
}

export default Spodify;
