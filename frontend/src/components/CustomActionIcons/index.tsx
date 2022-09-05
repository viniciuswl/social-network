import React, {useEffect, useState} from "react";

import CustomFavoriteIcon from "../CustomFavoriteIcon";


import CustomChatBubbleIcon from "../CustomChatBubbleIcon";

import handleLike from "../../service/handleLike"
interface Props{
    commentCount: number
    likeCount: number
    likes: string[]
    postId: string
}

const CustomActionIcons = ({commentCount, likeCount, likes, postId}: Props) =>{
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(likeCount)

    const profile = localStorage.getItem("profile")

    useEffect(() => {
        setLiked(likes.includes(profile as string))
    }, [profile, likes])
 
    return (
        <div>
            <CustomChatBubbleIcon commentCount={commentCount}></CustomChatBubbleIcon>
            <CustomFavoriteIcon handleLike={() => handleLike({liked, setLiked, likesCount, setLikesCount, postId})} likeCount={likesCount} liked={liked}></CustomFavoriteIcon>
        </div>
    )
}

export default CustomActionIcons