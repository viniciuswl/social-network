import React, { useEffect, useState } from "react"
import { Profile } from "../../Models/Profile";


import { useLocation } from "react-router-dom";
import server from "../../api/server";
import CustomAppBar from "../../components/CustomAppBar";
import { Box, Button } from "@mui/material";

const ProfilePage = () =>{
    const location = useLocation()
    const [profile, setProfile] = useState<Profile>()
    const token = localStorage.getItem("accessToken")
    const profileStorage = localStorage.getItem("profile")
    interface CustomizedState {
        profile: string
        
    }
    const state = location.state as CustomizedState

    const [numberOfFollowers, setNumberOfFollowers] = useState<number>(profile?.followers.length as number) 
   
    useEffect(() => {
        const getProfile =  async () => {
            try{
                 const response = await server.get(`/profiles/${state.profile}`,{
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                })
                
                setProfile(response.data)
    
            }catch(err){
                console.log(err)
            }
        }
        getProfile()
    }, [token])
   
    

    

    useEffect(() => {
        const upadateFollowers = () => {
            setNumberOfFollowers(profile?.followers.length as number)
        }
        upadateFollowers()
    },[profile])
   
    

    

    const follow = async () =>{
        try{
            await server.post(`/profiles/${state.profile}/follow`,{},{
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            setNumberOfFollowers(numberOfFollowers as number + 1)
            profile?.followers.push(profileStorage  as string)
        }catch(err){
            console.log(err)
        }
    }


    const unfollow = async () =>{
        try{
            await server.post(`/profiles/${state.profile}/unfollow`,{} ,{
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            setNumberOfFollowers(numberOfFollowers as number - 1)
            const index = profile?.followers.indexOf(profileStorage  as string)
            profile?.followers.splice(index as number, 1)
            
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <CustomAppBar title="Profile"></CustomAppBar>
            <Box component="main" sx={{flexGrow: 1, p: 3, marginTop: 20}}>
                <h1>{profile?.name}</h1>
                <div style={{display: "flex", fontWeight: "bold"}}>
                    <p>{numberOfFollowers} seguidores</p>
                    <p style={{marginLeft: 20}}>{profile?.following.length} seguindo</p>
                </div>
                {profile?.followers.includes(profileStorage  as string) ? 
                    <Button variant="contained" onClick={unfollow}>Parar de Seguir</Button> :
                    <Button variant="contained" onClick={ follow}>Seguir</Button> 
                }
            </Box>
        </div>
        
    )
}

export default ProfilePage