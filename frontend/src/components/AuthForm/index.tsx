import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import { Container, Stack, TextField, Button } from "@mui/material"

import logo from "../../assets/logo.svg"

interface Props{
    onSubmitForm: any
    onSubmitButtonText: string
    onRouteText: string
    onRouteLink: string
}

const AuthForm = ({onSubmitForm, onSubmitButtonText, onRouteText, onRouteLink}: Props) => {
    const [user, setUser] = useState({value: "", error: ""})
    const [password, setPassword] = useState({value: "", error: ""})
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmitForm(user.value, password.value, navigate)
    }

    return (
        <div>
            <Container maxWidth="sm">
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={6}>
                        <img src={logo} alt="Logo" className="logo"></img>
                        <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={6} >
                            <TextField variant="outlined" label="Usuário" name="user" value={user.value} 
                            onChange={(e) => setUser({value: e.target.value, error:""})}></TextField>
                            <TextField type="password" variant="outlined" label="Senha" name="password" value={password.value} 
                            onChange={(e) => setPassword({value: e.target.value, error:""})}></TextField>
                            <Button variant="contained" type="submit">{onSubmitButtonText}</Button>
                        </Stack>
                        <Link to={onRouteLink}>{onRouteText}</Link>
                    </Stack>
                </form>    
            </Container>
        </div>
    )
}

export default AuthForm