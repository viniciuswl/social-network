import { IconButton } from "@mui/material"
import React from "react"

import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import server from "../../api/server"


import { useNavigate } from "react-router-dom";

interface Props{
    postTitle: string
    postContent: string
    postId: string
    image: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomEditAndDeleteIcons = ({postTitle, postContent, postId, image, setVisible}: Props) =>{
    const navigate = useNavigate()
    const token = localStorage.getItem("accessToken")
    const deletePost = async (postId: string) => {
        try{
            await server.delete(`/posts/${postId}`, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            setVisible(false)
        }catch(err){
            console.log(err)
        }
    }

    const editPost = (postId: string, postTitle: string, postContent: string, image: boolean) =>{
        navigate("/editPost", {
            state:{
                id: postId,
                title: postTitle,
                content: postContent,
                img: image
            }
        })
    }

    return (
        <div style={{display: "flex", width: 250, justifyContent: "flex-end"}} >
            <IconButton sx={{marginRight: 1}} onClick={() => editPost(postId, postTitle, postContent, image)}>
                <EditIcon  fontSize="small"></EditIcon>
            </IconButton>
            <IconButton onClick={() => deletePost(postId)}>
                <DeleteIcon fontSize="small"></DeleteIcon>
            </IconButton>
        </div>
        
    )
}

export default CustomEditAndDeleteIcons