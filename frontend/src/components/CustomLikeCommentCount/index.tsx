import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import handleLike from "../../service/handleLike";


interface Props {
    commentCount: number
    likeCount: number
    likes: string[]
    postId: string
}

const CustomLikeCommentCount = ({commentCount, likeCount, likes, postId}: Props) =>{

    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(likeCount)
    const profile = localStorage.getItem("profile")

    useEffect(() => {
        setLiked(likes.includes(profile as string))
    }, [profile, likes])

    return (
        <div>
            <Typography sx={{marginRight: 2, fontWeight: "bold"}}  variant="caption" color="text.secondary">
                {commentCount} Comentários
            </Typography> 
            <IconButton onClick={() =>  handleLike({liked, setLiked, likesCount, setLikesCount, postId})}>
                <Typography  sx={{marginRight: 2, fontWeight: "bold"}} variant="caption" color="text.secondary">
                    {likesCount} Curtidas
                </Typography> 
            </IconButton>
            
        </div>
    )
}

export default CustomLikeCommentCount