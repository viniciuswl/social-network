import React, { useState} from "react"


import PostForm from "../../components/PostForm"


const NewPost = () =>{
    
    const [formData, setFormData] = useState({title: "", content: ""})

    const [hasImage, setHasImage] = useState(false)
    
    return (
        <div>
           <PostForm 
                hasImage={hasImage} 
                setHasImage={setHasImage}
                formData={formData}
                setFormData={setFormData}
                isPost={true}
            ></PostForm>
        </div>
    )
}

export default NewPost