import { useContext, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./contexts/AuthContext";
const Newblog = () => {
    const [formData, setFormData] = useState({"title": "","content": ""})
    const navigate = useNavigate();
    const {accessToken} = useContext(AuthContext)


    const handlesubmit = async (event)=>{
        event.preventDefault()
        const newBlog = {title: formData.title,content: formData.content}
        try{
        const res = await axios.post("/api/blogs/create",newBlog,{
            headers:{
                Authorization: `BEARER ${accessToken}`
            }
        })
        navigate("/")
        }
        catch(err){
            console.log(err.message)
        }
        
    }
    
    const handleChange = (event)=>{
        const newDataElement = event.target
        setFormData(() =>{ return {...formData, [newDataElement.name]: newDataElement.value}})
    }
    return (
        <div className=" flex flex-col mt-4 items-center">
            <form className="border-2 w-3/5 p-4" onSubmit={(e)=>handlesubmit(e)}>
                <div className="flex flex-col">
                    <input type="text" className="m-2 border-b-2 focus-visible:outline-none focus-within:border-b-blue-400" placeholder="Title" value={formData.title} name="title" onChange={(e) => handleChange(e)}/>
                </div>
                <div className="m-2">
                    <textarea className=" w-full focus-visible:outline-none focus-visible:outline-blue-400 " placeholder="Content" rows="15" value={formData.content} name="content" onChange={(e) => handleChange(e)}></textarea>
                </div>
                <button type="submit" className=" bg-blue-500 rounded p-2 m-2 text-white hover:bg-blue-400">Create</button>
            </form>
        </div>
    );
}

export default Newblog;