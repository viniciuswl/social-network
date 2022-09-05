import React from "react";
import {  CardContent, CardHeader, Divider, Paper, Stack, Typography } from "@mui/material";

import CustomAppBar from "../../components/CustomAppBar";
import CustomAvatar from "../../components/CustomAvatar";
import { Profile } from "../../Models/Profile";
import { useLocation } from "react-router-dom";

import GoToProfile from "../../components/GoToProfile";
import { useNavigate } from "react-router-dom";

const SearchProfile = () =>{
    const location = useLocation()
    const profileStorage = localStorage.getItem("profile")
    

    interface CustomizedState {
        profiles: Profile[]
    }
    const state = location.state as CustomizedState

    

    const profiles = state.profiles

    const navigate = useNavigate()
    
    

    return (
        <div>
            <CustomAppBar title="Profiles"></CustomAppBar>
            <div style={{marginTop: "56px"}}>
                <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
       
                    {profiles.map((profile) => (
                        <div key={profile._id}>
                            <Paper elevation={0} key={profile._id}>
                                <div onClick={() => GoToProfile(profile._id, profileStorage as string, navigate)}>
                                    <CardHeader 
                                        avatar={<CustomAvatar profileName={profile.name}></CustomAvatar>}
                                        title={profile.name}>
                                    </CardHeader>
                                </div>
                                <CardContent>
                                    <Stack spacing={1} justifyContent="start">
                                        <Typography variant="body2" color="text.secondary">
                                            {profile.followers.length} Seguidores
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Seguindo {profile.following.length} 
                                        </Typography>
                                            
                                    </Stack>
                                </CardContent>
                            </Paper>
                            <Divider></Divider>
                        </div>
                        
                    ))}
                </Stack>
            </div>
        </div>
    )
}

export default SearchProfile