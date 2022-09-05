import React from "react";
import { Avatar } from "@mui/material";

const CustomAvatar = ({profileName}: {profileName: string}) =>{
    const getInitials = (name: string) => name.split(" ").slice(0,2).map(name => name[0])
    return (
        <Avatar sx={{bgcolor: "red"}} aria-label={profileName}>{getInitials(profileName)}</Avatar>
    )
}

export default CustomAvatar