import React from 'react'
import { useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from './contexts/AuthContext'

export default function Register() {
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const usernameref = useRef("")
  const passwordref = useRef("")
  const navigate = useNavigate()
  const registerUser = async (user) => {
    try {
      setIsLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_PROXY}/api/register`, user)
      setIsLoading(false)
      if (res.status === 201) {
        alert("user successfully created")
        navigate("/login")
      }
    } catch (err) {
      alert(err.response.data)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      "name": usernameref.current.value.toString(),
      "password": passwordref.current.value.toString()
    }
    registerUser(user)
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="flex flex-col items-center h-96 justify-center space-y-8 w-2/6 mx-auto border-2 mt-8">
        <input className="w-96 border-b-2 focus-within:outline-none focus-within:border-blue-500" type="text" placeholder="username" ref={usernameref} />
        <input className="w-96 border-b-2 focus-within:outline-none focus-within:border-blue-500" type="password" placeholder="password" ref={passwordref} />
        {!isLoading && <button className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-200" type="submit">Register</button>}
        <div>
          <span>Already have an account? </span>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </form>
  )
}
