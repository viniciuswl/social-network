import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import PostForm from "../../components/PostForm";


const EditPost = () => {
    
    const location = useLocation()
    
    interface CustomizedState {
        id: string
        title: string
        content: string
        img: boolean
      }
    const state = location.state as CustomizedState
    
    const [formData, setFormData] = useState({title: state.title , content: "" })
    
    
    useEffect(() =>{
        if(!state.img) { 
            
            setFormData({...formData, content: state.content})
        }
        
    },[formData, state.content, state.img])

    const [hasImage, setHasImage] = useState(state.img)

    return (
        <div>
            <PostForm 
                id={state.id} 
                title={state.title} 
                content={state.content} 
                hasImage={hasImage} 
                setHasImage={setHasImage}
                formData={formData}
                setFormData={setFormData}
                isPost= {false}
            ></PostForm>
        </div>
    )
}


export default EditPost