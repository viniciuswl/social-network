import React from "react";
import { NavigateFunction } from "react-router-dom";




const GoToProfile = (profileId: string, profile: string, navigate: NavigateFunction) => {
    
    
    if(profileId === profile){
        navigate("/userprofile")
    }else{
        navigate("/profile", {
            state:{
                profile: profileId
            }
        })
    }
    
}

export default GoToProfile