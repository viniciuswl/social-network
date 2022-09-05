import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {  Paper} from "@mui/material"
import server from "../../api/server";
import PostCard from "../../components/PostCard";
import CustomAppBar from "../../components/CustomAppBar";
import {Post} from "../../Models/Post";
import { Divider } from "@mui/material";
import ShowComments from "../../components/ShowComments";
import CommentForm from "../../components/CommentForm";


const PostDetail = () =>{
    const {postId}= useParams()
    const [post, setPost] = useState<Post>()
    const [comment, setComment] = useState({value: "", error: ""})
    const token = localStorage.getItem("accessToken")

    useEffect(() => {
        const getPost = async () =>{
            try{
                const response = await server.get(`/posts/${postId}`, {
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                })
                setPost(response.data)
                
            }catch (err){
                console.log(err)
            }
        }
        getPost()
    }, [token, postId])

    
   
    
    return (
        <div>
            <CustomAppBar title="Post"></CustomAppBar>
            <div style={{marginTop: 56}}>
                {post && <PostCard post={post} handlePostClick={() => {}} icon={false}></PostCard>}
            </div>
            <Divider></Divider>
            <Paper elevation={0} sx={{marginX: 24, marginTop: 2}}>
                <CommentForm post={post} setPost={setPost} postId={postId as string} comment={comment} setComment={setComment} ></CommentForm>
            </Paper>
            <Divider sx={{marginTop: 2}}></Divider>
            <ShowComments post={post as Post} ></ShowComments>

        </div>
    )
}

export default PostDetail