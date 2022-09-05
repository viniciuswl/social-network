import { Button, Container, Stack, TextField } from "@mui/material"
import React, { ChangeEvent, FormEvent, useState } from "react"
import server from "../../api/server"

import CustomAppBar from "../CustomAppBar"
import { useNavigate } from "react-router-dom";
import Dropzone from "../Dropzone"

interface CustomizedState {
    id?: string
    title?: string
    content?: string
    hasImage: boolean
    setHasImage:React.Dispatch<React.SetStateAction<boolean>>
    formData: {title: string;content: string;}
    setFormData:React.Dispatch<React.SetStateAction<{title: string;content: string;}>>
    isPost: boolean
  }

const PostForm = ({id, title, content, hasImage, setHasImage, formData, setFormData, isPost}: CustomizedState ) =>{
    const navigate  = useNavigate()

    const token = localStorage.getItem("accessToken")
    
    const [selectedFile, setSelectedFile] = useState<File>()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData({ ...formData, [name]: value})
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const {title, content} = formData
        const data = new FormData()
        data.append("title", title)
        data.append("content", content)
        data.append("image", "false")
        if(selectedFile){
            data.append("file", selectedFile)
        }
        try{
            if(!isPost){
                await server.put(`/posts/${id}`, data, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                
            }else{
                 await server.post("/posts", data, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                
            }
            
            navigate("/home")
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <CustomAppBar title="Editar Post"></CustomAppBar>
            <Container sx={{marginTop: 12}}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={6}>
                        <TextField variant="standard" label="Título" name="title" value={formData.title} onChange={handleInputChange}></TextField>
                        {selectedFile || hasImage? null: (<TextField 
                            variant="standard" 
                            label="O que está acontecendo?" 
                            name="content"
                            multiline
                            minRows={3}
                            value={formData.content} onChange={handleInputChange}>
                        </TextField>)}
                        
                        {hasImage ? 
                            (<Dropzone onFileUploaded={setSelectedFile } url={content as string} image={setHasImage} ></Dropzone>) : 
                            (<Dropzone onFileUploaded={setSelectedFile } url={""} image={setHasImage}></Dropzone>)
                        } 
                        <Button variant="contained" type="submit">Publicar</Button>
                    </Stack>
                </form>
            </Container>
        </div>
        
    )
}

export default PostForm