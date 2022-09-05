export interface Post {
    _id: string
    title: string
    content: string
    profile:{
        _id: string
        name: string
    }
    image: boolean
    comments:  {
        _id: string
        content: string 
        post: string
        profile: {
            _id: string
            name: string
        }
    }[]
    likes: string[]
}