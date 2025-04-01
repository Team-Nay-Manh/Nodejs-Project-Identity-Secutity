import React from "react"
import "./navbar.css"
import useAuthStore from "../../../utils/authStore"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { removeCurrentUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeCurrentUser()
    navigate("/admin/login")
    toast.success("Logout Successfully!!!")
  }

  return (
    <nav>
      <i className='bx bx-menu'></i>
      <form action='#'>
        <div className='form-input'>
          <input type='search' placeholder='Search...' />
          <button className='search-btn' type='submit'>
            <i className='bx bx-search'></i>
          </button>
        </div>
      </form>
      <button className='btn_logout' onClick={handleLogout}>
        Logout
      </button>
      <a href='#' className='notif'>
        <i className='bx bx-bell'></i>
        <span className='count'>12</span>
      </a>
      <a href='#' className='profile'>
        <img src='/noAvatar.png' alt='profile' />
      </a>
    </nav>
  )
}

export default Navbar
