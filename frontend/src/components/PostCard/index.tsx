import { Paper, CardHeader, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import React, { useState } from "react";
import CustomAvatar from "../CustomAvatar"
import CustomActionIcon from "../CustomActionIcons"
import {Post} from "../../Models/Post";
import CustomLikeCommentCount from "../CustomLikeCommentCount"
import CustomEditAndDeleteIcons  from "../CustomEditAndDeleteIcons"
import { useNavigate } from "react-router-dom";

import GoToProfile from "../GoToProfile"



interface Props{
    post: Post
    handlePostClick: any
    icon: boolean
}

const PostCard = ({post, handlePostClick, icon}: Props) =>{
    const [visible, setVisible] = useState(true)
    const profile = localStorage.getItem("profile")
    const navigate = useNavigate()

    if (visible)
    { 
        return (
            <Paper elevation={0} sx={{marginX: 24}}>
                <div style={{display:"flex"}}>
                    <div onClick={() => GoToProfile(post.profile._id, profile as string, navigate)}>
                        <CardHeader sx={{width: 300}} avatar={<CustomAvatar profileName={post.profile.name}></CustomAvatar>} title={post.title}>
                        </CardHeader>
                    </div>
                   
                    {post.profile._id === profile as string ?
                    (<CustomEditAndDeleteIcons postTitle = {post.title} postContent = {post.content} 
                        postId={post._id} image={post.image} setVisible={setVisible}></CustomEditAndDeleteIcons>) :
                    (<></>) }
                </div>
                <div onClick={() => handlePostClick(post._id)}>    
                    {post.image ? (
                        <CardMedia sx={{ marginX: 2,maxWidth: "100%", width: 550, height: 400, objectFit: "fill"}} component="img" image={post.content} alt={post.title}></CardMedia>
                    ): (
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {post.content}
                            </Typography>
                        </CardContent>
                    )}
                </div>
                <CardActions>
                    <div style={{
                        display: "flex", 
                        flexDirection: "row", 
                        alignItems: "flex-start", 
                        justifyContent: "start"
                    }}>
                        {icon ? ( 
                            <CustomActionIcon 
                                commentCount={post.comments.length} 
                                likeCount={post.likes.length} 
                                likes={post.likes}
                                postId={post._id}
                            ></CustomActionIcon>
                        ) : (
                            <CustomLikeCommentCount 
                                commentCount={post.comments.length}
                                likeCount={post.likes.length}
                                likes={post.likes}
                                postId={post._id}
                            ></CustomLikeCommentCount>
                        )}         
                    </div>
                </CardActions>
            </Paper>
        ) 
    } else
    {
        return (<></>)
    }
}

export default PostCard