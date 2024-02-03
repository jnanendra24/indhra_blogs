import { FaTrash } from "react-icons/fa";
import axios from "axios";
import useFetch from "./useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";


const Blogdetails = () => {
    const { id } = useParams();
    const { accessToken, user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { data: blog, isPending, isError } = useFetch(`${import.meta.env.VITE_PROXY}/api/blogs/` + id)
    const handleDelete = async () => {
        const res = await axios.delete(`${import.meta.env.VITE_PROXY}/api/blogs/delete/${id}`, {
            headers: {
                Authorization: `BEARER ${accessToken}`
            }
        })
        if (res.status == 200) {
            alert("Blog successfully deleted")
            navigate("/user-blogs")
        }
    }
    return (
        <div className=" flex flex-col mx-auto my-3 p-3 w-11/12 border-2">
            {(isPending && <h2>Loading....</h2>) ||
                (isError && <h2>{isError}</h2>) ||
                (blog && (<div className="">
                    <div className="flex items-center">
                        <h2 className="text-3xl">{blog.title}</h2>
                        <h5 className="right-8 text-sm self-end ml-2">-{blog.author}</h5>
                    </div>
                    <hr></hr>
                    <p className="mt-2 text-justify">{blog.content}</p>
                   {user.toLowerCase() === blog.author.toLowerCase() && <button className="border-2 p-2 bg-blue-500 text-white mt-4 rounded-lg hover:bg-blue-400" onClick={handleDelete}><FaTrash />
                    </button>}
                </div>))
            }
        </div>
    )
}

export default Blogdetails;