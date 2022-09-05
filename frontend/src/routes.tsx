import React from "react";
import { Route,  Routes} from "react-router-dom";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import UserProfile from "./pages/UserProfile";
import Profiles from "./pages/Profiles";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import SearchProfile from "./pages/SearchProfile"


import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";


<Route path="/home" element={<Home></Home>}></Route>

const CustomRoutes = () =>{
    return (
        <Routes>
            <Route path='/'  element={<Signin></Signin>}></Route>
            <Route element={<ProtectedRoute></ProtectedRoute>}>
                <Route path="/home"  element={<Home></Home>} ></Route>
                <Route path="/new" element={<NewPost></NewPost>}></Route>
                <Route path="/userprofile" element={<UserProfile></UserProfile>}></Route>
                <Route path="/profiles" element={<Profiles></Profiles>}></Route>
                <Route path="/posts/:postId" element={<PostDetail></PostDetail>}></Route>
                <Route path="/editPost" element={<EditPost ></EditPost>}></Route>
                <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
                <Route path="/searchprofile" element={<SearchProfile></SearchProfile>}></Route>
            </Route>
            <Route path="/register" element={<Signup></Signup>}></Route>
            
        </Routes>
    )
}

export default CustomRoutes