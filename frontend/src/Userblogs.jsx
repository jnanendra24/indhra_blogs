import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from './contexts/AuthContext';
import Bloglist from './Bloglist';

export default function Userblogs() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {accessToken} = useContext(AuthContext)
    const fetchUserBlogs = async ()=>{
        try{
            setIsPending(true)
            const res = await axios.get(`${import.meta.env.VITE_PROXY}/api/blogs/user-blogs`,{
                headers:{
                    Authorization: `BEARER ${accessToken}`
                }
            })
            setIsPending(false)
            setData(res.data)
        }
        catch(err){
            alert(err.res.data)
        }
    }
    useEffect(()=>{
        fetchUserBlogs()
    },[])
    return (
        <div>
            {   
                (isPending && <h1>Loading..</h1>) ||
                (data && <Bloglist blogs={data}/>)
            }
        </div>
    );
}
