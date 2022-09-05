import React from "react"

import { Button, TextField } from "@mui/material"
import server from "../../api/server"

import { Post } from "../../Models/Post"

interface Props {
    post: Post | undefined
    setPost: React.Dispatch<React.SetStateAction<Post | undefined>>
    postId: string
    comment: {value: string ,error: string;}
    setComment: React.Dispatch<React.SetStateAction<{value: string; error: string;}>>
}

const CommentForm = ({post, setPost, postId, comment, setComment}: Props) =>{

    const token = localStorage.getItem("accessToken")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try{
            const response =  await server.post(`/posts/${postId}/comments`, {content: comment.value}, {
                headers:{authorization: `Bearer ${token}`}
            })

            setComment({...comment, value: ""})
            
            console.log(response.data)
            post?.comments.push(response.data)
            setPost(post)
        }catch(err){
            console.log(err)
        }
        
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                    <TextField 
                    id="comment" 
                    label="Comentário" 
                    variant="standard" 
                    multiline minRows={3} 
                    fullWidth
                    value={comment.value} onChange={(e) => setComment({value: e.target.value, error: ""})}></TextField>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "end"}}>
                        <Button variant="contained" type="submit" sx={{marginTop: 2}}>Publicar</Button>
                    </div>
                </form>
        </div>
    )
}

export default CommentForm