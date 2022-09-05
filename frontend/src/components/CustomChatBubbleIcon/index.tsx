import { Typography, IconButton } from "@mui/material";
import React from "react";
import { 
    ChatBubbleOutline as ChatBubbleOutlineIcon
} from "@mui/icons-material";

interface Props{
    commentCount: number
}

const CustomChatBubbleIcon = ({commentCount}: Props) =>{
    return (
        <>
            <IconButton>
                <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon>
            </IconButton>
            <Typography variant="caption" color="text.secondary">
                {commentCount}
            </Typography>
        </>
    )
}

export default CustomChatBubbleIcon