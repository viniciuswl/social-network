import React, { useState, useCallback} from "react";
import { useDropzone } from "react-dropzone";
import {Image as ImageIcon, Delete as DeleteIcon}  from "@mui/icons-material"


import "./index.css"
import { IconButton } from "@mui/material";
import { start } from "repl";

interface Props{
    onFileUploaded: (file: File) => void
    url: string
    image?: React.Dispatch<React.SetStateAction<boolean>>
}

const Dropzone = ({onFileUploaded, url, image}: Props) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState(url)
    
    const onDrop = useCallback((acceptedFiles: any[]) => {
        const file = acceptedFiles[0]

        const fileUrl = URL.createObjectURL(file)

        setSelectedFileUrl(fileUrl)
        onFileUploaded(file)
    }, [onFileUploaded])

    const {  getRootProps, getInputProps} = useDropzone({
        onDrop
    })

    const removeImage = () =>{
        setSelectedFileUrl("")
        if(image){
            image(false)
        }
    }

    return(
        <div  className="dropzone">
            <input {...getInputProps()} ></input>
            {selectedFileUrl ? (
                <div style={{display: "flex"}}>  
                    <img {...getRootProps()} src={selectedFileUrl} alt="Point thumbnail"></img>
                    
                        <IconButton sx={{marginLeft: 2, height: 5}} onClick={() => removeImage()}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                        
                </div>
            ) : (
                <p {...getRootProps()}>
                    <ImageIcon ></ImageIcon>
                </p>
            )}
        </div>
    )
}

export default Dropzone