import { Box, Button, CardHeader } from "@mui/material"
import React from "react"
import CustomAppBar from "../../components/CustomAppBar"
import { useNavigate } from "react-router-dom"

import CustomAvatar from "../../components/CustomAvatar"

const UserProfile = () =>{
    const navigate = useNavigate()
    
    const user = localStorage.getItem("user")
    const handleLogout = () =>{
        localStorage.clear()
        navigate("/")
    }

    return (
        <div>
            <CustomAppBar title="UserProfile"></CustomAppBar>
            <Box component="main" sx={{flexGrow: 1, p: 3, marginTop: 20}}>
                <CardHeader 
                    avatar={<CustomAvatar profileName={user as string}></CustomAvatar>}
                    title={user as string}>
                </CardHeader>
                <div >
                    <Button style={{width:"100%" , marginTop:5}} variant="contained" onClick={() => handleLogout()}>Sair</Button>
                </div>
                
            </Box>
        </div>
    )
}

export default UserProfile