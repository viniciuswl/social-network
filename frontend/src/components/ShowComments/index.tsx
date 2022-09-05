import { CardHeader, Divider,  Paper } from "@mui/material";
import {Post} from "../../Models/Post";
import CustomAvatar from "../CustomAvatar";


interface Props{
    post: Post
   
}

const ShowComments = ({post}: Props ) =>{
    
    return (
        <>
            {post?.comments && post?.comments.map(item => (
                <div key={item._id}>
                    <Paper elevation={0} sx={{marginX: 24, marginY: 2}}>
                        <div style={{display: "flex"}} > 
                            <CardHeader 
                                avatar={<CustomAvatar profileName={item.profile.name}></CustomAvatar>} 
                                title={item.content}>                                    
                            </CardHeader>
                        </div>
                        
                    </Paper>
                    <Divider></Divider>
                </div> 
                 
                
            ))}
        </>
    )
   
}

export default ShowComments