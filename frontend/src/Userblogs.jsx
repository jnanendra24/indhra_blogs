import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from './contexts/AuthContext';
import Bloglist from './Bloglist';

export default function Userblogs() {
    const [data, setData] = useState(null)
    const {accessToken} = useContext(AuthContext)
    const fetchUserBlogs = async ()=>{
        try{
            const res = await axios.get(`${import.meta.env.VITE_PROXY}/api/blogs/user-blogs`,{
                headers:{
                    Authorization: `BEARER ${accessToken}`
                }
            })
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
                (data && <Bloglist blogs={data}/>)
            }
        </div>
    );
}
