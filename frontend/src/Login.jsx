import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import React, { useContext } from 'react';
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext";

export default function Login() {
    const usernameref = useRef("")
    const passwordref = useRef("")
    const { setAccessToken,isAuthenticated , setIsAuthenticated , isLoading, setIsLoading} = useContext(AuthContext);
    const navigate = useNavigate()
    const loginUser = async (user) => {
        try {
            setIsLoading(true)
            const res = await axios.post("/api/login", user)
            if (res.data.token) {
                sessionStorage.setItem("token", res.data.token)
                setAccessToken(res.data.token)
                setIsLoading(false)
                setIsAuthenticated(true)
                navigate("/")
            }

        } catch (err) {
            setIsLoading(false)
            alert(err.response.data)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            "name": usernameref.current.value.toString(),
            "password": passwordref.current.value.toString()
        }
        loginUser(user)
    }
    return (
        <form onSubmit={e => handleSubmit(e)}>
            <div className="flex flex-col items-center h-96 justify-center space-y-8 w-2/6 mx-auto border-2 mt-8">
                <input className="w-96 border-b-2 focus-within:outline-none focus-within:border-blue-500" type="text" placeholder="username" ref={usernameref} />
                <input className="w-96 border-b-2 focus-within:outline-none focus-within:border-blue-500" type="password" placeholder="password" ref={passwordref} />
                {!isLoading && <button className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-200" type="submit">login</button>}
                <div>
                    <span>Don't have an account? </span>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </form>
    )
}

// if(isLoading){
//     return(<></>)
// }
// return (
//     <>
//         {
//             accessToken ?
//                 (
//                 <>
//                 <button className="text-blue-500 text-lg" onClick={() => { logout({ logoutParams: { returnTo: window.location.origin } }) }} >Log Out</button>
//                 <Link to="/new-blog" className="text-blue-500 text-lg hover:no-underline">New Blog</Link>
//                 </>)
//                 :
//                 <button onClick={() => { loginWithRedirect() }} >Log In</button>
//         }
//     </>
// )