import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Badge } from "@mui/material";
import {Home as HomeIcon, Edit as EditIcon, Group as GroupIcon, AccountCircle as AccountCircleIcon, Search as SearchIcon, Email as EmailIcon} from "@mui/icons-material"
import CustomIconButton from "../CustomIconButton"
import {  useNavigate } from 'react-router-dom';
import io from "socket.io-client"
import Search from "../Search";
import SearchIconWrapper from "../SearchIconWrapper";
import StyledInputBase from "../StyledInputBase";
import server from "../../api/server"

import constants from "../../constants"

interface Props {
    title: string
}





const CustomAppBar = ({title}: Props) =>{

    const navigate = useNavigate();
    
    const [profile, setProfile] = useState({value: "", error: ""})
    const token = localStorage.getItem("accessToken")

    const submit =  async (e: React.FormEvent<HTMLFormElement>) =>{
        try{
            e.preventDefault()
            const response = await server.get("/profiles/search", {params:{q: profile.value}, 
                headers:{authorization: `Bearer ${token}`}
            })
            if(response.data.length === 0){
                alert("Não encontramos nenhum perfil")
            }
            else{
                navigate("/searchprofile", {
                    state:{
                        profiles: response.data
                    }
                })
            }
        }catch(err){
            console.log(err)
        }

    }
    const [messageCount, setMessageCount] = useState(0)
    const socket = io(constants.SERVER_ADDRESS, {
        auth: {token},
    })

    useEffect(() => {
        socket.on("connected", () => {
            console.log(socket);
        });

        socket.on("connected profile", (profile) => {
            console.log(profile);
        });

        socket.on("disconnected", () => {
            console.log(socket);
        });

        socket.on("post", (data) => {
            console.log(data);
            setMessageCount((count) => count + 1);
        });
        socket.on("post-like", data =>{
            console.log(data);
            setMessageCount((count) => count + 1);
        })
        socket.on("post-unlike", data =>{
            console.log(data);
            setMessageCount((count) => count + 1);
        })

        socket.on("comment", (data) => {
            console.log(data);
            setMessageCount((count) => count + 1);
        });

        socket.on("comment-like", (data) => {
            console.log(data);
            setMessageCount((count) => count + 1);
        });
        socket.on("comment-unlike", (data) => {
            console.log(data);
            setMessageCount((count) => count + 1);
        });
        socket.on("following", (data) => {
            console.log(data);
            setMessageCount((count) => count + 1);
        });
        socket.on("unfollowing", (data) => {
            console.log(data);
            setMessageCount((count) => count + 1);
        });

        socket.on("connect_error", (error) => {
            console.log(error);
        });

        return () => {
            socket.off();
        }
    }, [token, socket]);

    const handleClickEmail = () =>{
        if(messageCount){
            setMessageCount(0)
            window.location.reload()
        }
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    noWrap 
                    component="div" 
                    sx={{display: {xs: "none", sm: "block"}}}
                >
                    {title}
                </Typography>
                <Search onSubmit={(e) => submit(e)} >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setProfile({value: e.target.value, error:""})}
                    />
                </Search>
                <Box sx={{flexGrow:1}}></Box>
                <Box sx={{display:{xs: "none", md: "flex"}}}>
                    <CustomIconButton label="show home" onClickCallback={() => navigate("/home")}>
                        <HomeIcon></HomeIcon>
                    </CustomIconButton>
                    <CustomIconButton label="notification" onClickCallback={handleClickEmail}>
                        <Badge badgeContent={messageCount} color="secondary">
                            <EmailIcon></EmailIcon>
                        </Badge>
                    </CustomIconButton>
                    <CustomIconButton label="show edit" onClickCallback={() => navigate("/new")}>
                        <EditIcon></EditIcon>
                    </CustomIconButton> 
                    <CustomIconButton label="show profiles" onClickCallback={() => navigate("/profiles")}>
                        <GroupIcon></GroupIcon>
                    </CustomIconButton> 
                    <CustomIconButton label="show profile" onClickCallback={() => navigate("/userprofile")}>
                        <AccountCircleIcon></AccountCircleIcon>
                    </CustomIconButton>       
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar