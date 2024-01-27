import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { useContext,useEffect } from "react";

const Navbar = () => {
    const { isAuthenticated,setIsAuthenticated, setAccessToken } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setAccessToken(storedToken)
            if (!isAuthenticated) {
                setIsAuthenticated(true)
            }
        }
    }, [isAuthenticated])
    const handleLogOut = () => {
        sessionStorage.removeItem("token")
        setIsAuthenticated(false)
    }
    return (
        <nav className="flex items-center justify-between shadow-sm p-2 sticky top-0 bg-white z-50">
            <h1 className="text-3xl	text-blue-500 hover:text-blue-300">Indhra blogs</h1>
            <ul className="flex items-center space-x-8">
                <Link to="/" className="text-blue-500 text-lg hover:no-underline">Home</Link>
                {!isAuthenticated && <Link className="hover:no-underline text-lg text-blue-500 hover:text-blue-300" to="/login">Log In</Link>}
                {isAuthenticated &&
                    (<>
                        <Link to="/user-blogs">My Blogs</Link>
                        <Link to="/new-blog">Create Blog</Link>
                        <Link className="hover:no-underline text-lg text-blue-500 hover:text-blue-300" to="/login" onClick={handleLogOut}>Log Out</Link>
                    </>)
                }
            </ul>
        </nav >
    );
}

export default Navbar;