import React from "react"
import AuthForm from "../../components/AuthForm"
import server from "../../api/server";
import login from "../../service/login"

const Signup = () =>{
    const handleRegister = async (user: string, password: string, navigate: any) =>{
        try{
            await server.post("/security/register",{
                user,
                password
            })
            login(user, password, navigate)
            
        }catch(err: any){
            if(err.response.status === 500){
                alert("Usuario  Duplicado")
            }
        }
    }
    return(
        <AuthForm onSubmitForm={handleRegister} onSubmitButtonText="Cadastro" onRouteText="Já tem uma conta? Faça o login"
        onRouteLink="/"></AuthForm>
    )
}

export default Signup