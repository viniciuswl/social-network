import React from "react"
import server from "../api/server"

    
    
interface Props{
    liked: boolean
    setLiked: React.Dispatch<React.SetStateAction<boolean>> 
    likesCount: number
    setLikesCount: React.Dispatch<React.SetStateAction<number>> 
    postId: string
}

const token = localStorage.getItem("accessToken")

const handleLike = async ({liked, setLiked, likesCount, setLikesCount, postId} :Props ) =>{
    try{
        if(!liked){
            await server.post(`/posts/${postId}/like`, null, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            setLiked(true)
            setLikesCount(likesCount +1)
        }else{
            await server.post(`/posts/${postId}/unlike`, null, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            setLiked(false)
            setLikesCount(likesCount -1)
        }
        
    }catch(err){
        console.log(err)
    }
}

export default handleLike