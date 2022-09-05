import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import CustomAppBar from "../../components/CustomAppBar";
import PostCard from "../../components/PostCard";




import server from "../../api/server"
import { Divider } from "@mui/material";
import {Post} from "../../Models/Post";

const Home = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const token = localStorage.getItem("accessToken")
    
    useEffect(() => {
        const getPosts = async () => {
            try{
                const response = await server.get(`/feed?page=${page}`, {
                    headers:{
                        authorization: `Bearer ${token}`
                    },
                })
                
                setHasMore(response.data.length > 0)
                setPosts( p =>[...p, ...response.data])
            }catch (err){
                console.log(err)
            }
        }
        getPosts()
    }, [token, page])

    const loadMorePosts = () =>{
        setPage(page +1)
    }

    const handlePostClick = (postId: string) =>{
        navigate(`/posts/${postId}`)
    }

    return (
        <div>
            <CustomAppBar title="Home"></CustomAppBar>
            <div style={{marginTop: "56px"}}>
                <InfiniteScroll 
                    dataLength={posts.length}
                    next={loadMorePosts}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    {posts && posts.map((post) =>(
                        <div key={post._id}> 
                            <PostCard post={post} handlePostClick={handlePostClick} icon={true}></PostCard>
                            <Divider></Divider>
                        </div>
                    ))}
                </InfiniteScroll>
                
            </div>
        </div>
    )
}

export default Home;