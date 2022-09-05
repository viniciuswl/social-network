import React from "react"
import { Outlet, Navigate } from "react-router-dom"


const ProtectedRoute = () =>{
    const token = localStorage.getItem("accessToken")
    let isAuth = false

        if (token){
            isAuth = true
       }

    return (
        isAuth? <Outlet></Outlet>: <Navigate to="/"></Navigate>
    )
}

export default ProtectedRoute