import { IconButton } from "@mui/material";
import React, { ReactElement } from "react";

interface Props{
    children: ReactElement
    label: string
    onClickCallback: any
}

const CustomIconButton = ({ children, label, onClickCallback }: Props) =>{
    return (
        <IconButton
            size="large"
            arial-label={label}
            color="inherit"
            onClick={() => onClickCallback()}
        >
            {children}
        </IconButton>
    )
}

export default CustomIconButton