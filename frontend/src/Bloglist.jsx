import { Link } from "react-router-dom";

const Bloglist = (props) => {
    return (
        <div className="flex flex-col  items-center mt-10">
            <div className=" w-5/12 border-2 rounded">
                {props.blogs && props.blogs.map((blog) => {
                    return (
                        <div className="grid grid-cols-3 mb-2 p-2" key={blog._id}>
                            <Link to={`/blogs/${blog._id}`} className="hover:no-underline col-span-2 text-3xl"><h2>{blog.title}</h2></Link>
                            <h5 className="col-span-2 text-lg">written by {blog.author}</h5>
                        </div>
                    );
                }
                )}
            </div>
        </div>
    );
}

export default Bloglist;