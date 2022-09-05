import jwtDecode from "jwt-decode";
import server from "../api/server";

interface TokenUser{
    user: string;
    profile: string;
}

const handleLogin = async (user: string, password: string, navigate: any) => {
    
    try{
        
        const response = await server.post("/security/login",{
            user,
            password
        })
    
        const accessToken = response.data
        localStorage.setItem("accessToken", accessToken)
        const decode = jwtDecode(accessToken) as TokenUser
        localStorage.setItem("user", decode.user)
        localStorage.setItem("profile", decode.profile)
        navigate("/home")
    }
    catch(err: any){
        if(err.response.status === 401){
            alert("Usuario ou Senha incorretos")
        }
    }
       
}

export default handleLogin