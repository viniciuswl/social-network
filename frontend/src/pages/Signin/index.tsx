import login from "../../service/login"

import AuthForm from "../../components/AuthForm"

import "./index.css"

const Signin = () =>{
    return (
        <AuthForm onSubmitForm={login} onSubmitButtonText="Login"
            onRouteText="Não tem uma conta? Faça o cadastro" onRouteLink="register"></AuthForm>  
    )
}

export default Signin