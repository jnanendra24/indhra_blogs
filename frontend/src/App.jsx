import Blogdetails from "./Blogdetails";
import Home from "./Home";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Newblog from "./Newblog";
import Login from "./Login";
import Register from "./Register";
import Userblogs from "./Userblogs";
import { AuthContext } from "./contexts/AuthContext";
import { useState } from "react";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <Router>
      <AuthContext.Provider value={{ accessToken,setAccessToken,isAuthenticated, isLoading, setIsAuthenticated,setIsLoading }}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/user-blogs" element={<Userblogs />} />
          <Route exact path="/new-blog" element={<Newblog />} />
          <Route exact path="/blogs/:id" element={<Blogdetails />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  )
}

export default App;