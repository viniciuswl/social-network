import React, {useState, useEffect} from "react"
import { Paper, Stack, CardHeader, CardContent, Typography, Button, Divider } from "@mui/material"
import CustomAppBar from "../../components/CustomAppBar"

import server from '../../api/server'

import CustomAvatar from "../../components/CustomAvatar"
import { Profile } from "../../Models/Profile"



const Profiles = () =>{
    const [profiles, setProfiles] = useState<Profile[]>([])
    const token = localStorage.getItem("accessToken")
    const profileStorage = localStorage.getItem("profile")

    useEffect(() =>{
        const getProfiles = async () =>{
            try{
                const response = await server.get("/profiles", {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setProfiles(response.data)
            }catch(err){
                console.log(err)
            }
        }

        getProfiles()
    },[token])

    const follow = async (id: string) =>{
        try{
            await server.post(`/profiles/${id}/follow`,null, {
                headers: {Authorization: `Bearer ${token}`}
            })
            const newProfiles = profiles.map(profile => {
                if(profile._id === id){
                    return {
                        ...profile, followers:[...profile.followers, profileStorage as string]
                    }
                }else if (profile._id === profileStorage){
                    return {
                        ...profile, following:[...profile.following, id]
                    }
                }else{
                    return profile
                }
                
            })
            setProfiles(newProfiles)
        }catch(err){
            console.log(err)
        }
    }

    const unfollow = async (id: string) =>{
        try{
            await server.post(`/profiles/${id}/unfollow`,null, {
                headers: {Authorization: `Bearer ${token}`}
            })
            const newProfiles = profiles.map(profile => {
                if(profile._id === id){
                    return {
                        ...profile, followers: profile.followers.filter(p => p !== profileStorage)
                    }
                }else if (profile._id === profileStorage){
                    return {
                        ...profile, following:profile.following.filter(p => p!== id) 
                    }
                }else{
                    return profile
                }
                
            })
            setProfiles(newProfiles)

        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <CustomAppBar title="Profiles"></CustomAppBar>
            <div style={{marginTop: "56px"}}>
                <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
       
                    {profiles.map((profile) => (
                        <div key={profile._id}>
                            <Paper elevation={0} key={profile._id}>
                                <CardHeader 
                                    avatar={<CustomAvatar profileName={profile.name}></CustomAvatar>}
                                    title={profile.name}>
                                </CardHeader>
                                <CardContent>
                                    <Stack spacing={1} justifyContent="start">
                                        <div>
                                            <Typography variant="body2" color="text.secondary">
                                                {profile.followers.length} Seguidores
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Seguindo {profile.following.length} 
                                            </Typography>
                                        </div>
                                        
                                        {profile._id !== profileStorage as string ?
                                            profile.followers.includes(profileStorage as string)  ? 
                                            <Button variant="contained" onClick={() => unfollow(profile._id)}>Parar de Seguir</Button> :
                                            <Button variant="contained" onClick={() => follow(profile._id)}>Seguir</Button> : <></>}
    
        
                                        
                                            
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

export default Profiles