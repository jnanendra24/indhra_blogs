import Bloglist from "./Bloglist";
import useFetch from "./useFetch";
const Home = () => {
    const { data: blogs, isPending, isError} = useFetch(`${import.meta.env.VITE_PROXY}/api/blogs`)
    return (
        <div>
            {
                (isPending && <h2 className="msg-loading">Loading...</h2>) ||
                (isError && <h2 className="msg-loading">ERROR WHILE FETCHING DATA...</h2>) ||
                (blogs && <Bloglist blogs={blogs} />)
            }
        </div>
    );
}

export default Home;