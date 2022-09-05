import { IconButton, Typography } from "@mui/material";
import React from "react";

import { 
    FavoriteBorder as FavoriteBorderIcon,
    Favorite as FavoriteIcon
} from "@mui/icons-material";

interface Props{
    handleLike: any
    liked: boolean
    likeCount: number
}

const CustomFavoriteIcon = ({handleLike, liked, likeCount}: Props) =>{
    return (
        <>
            <IconButton onClick={() =>  handleLike()}>
                {liked ? 
                    (<FavoriteIcon fontSize="small" sx={{color: "red"}}></FavoriteIcon>) : 
                    (<FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon>)
                }
            </IconButton>
            <Typography variant="caption" color="text.secondary">
                {likeCount}
            </Typography>
        </>

    )
}

export default CustomFavoriteIcon