import React from "react"
import "../index.css"
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const location = useLocation()
  const pathSegments = location.pathname.split("/")
  const lastSegment = pathSegments[pathSegments.length - 1]
  console.log(lastSegment)
  return (
    <div className='sidebar'>
      <Link to='/' className='logo'>
        <i className='bx bx-code-alt'></i>
        <div className='logo-name'>
          <span>Asmr</span>Prog
        </div>
      </Link>
      <ul className='side-menu'>
        <li className={`${lastSegment === "home" ? "active" : ""}`}>
          <Link to='/admin/home'>
            <i className='bx bxs-dashboard'></i>Home
          </Link>
        </li>
        <li className={`${lastSegment === "products" ? "active" : ""}`}>
          <Link to='/admin/products'>
            <i className='bx bx-store-alt'></i>Product
          </Link>
        </li>
        <li className={`${lastSegment === "orders" ? "active" : ""}`}>
          <Link to='/admin/orders'>
            <i className='bx bx-analyse'></i>Orders
          </Link>
        </li>

        <li className={`${lastSegment === "users" ? "active" : ""}`}>
          <Link to='/admin/users'>
            <i className='bx bx-group'></i>Users
          </Link>
        </li>
      </ul>
      <ul className='side-menu'>
        <li>
          <Link to='/admin' className='logout'>
            <i className='bx bx-log-out-circle'></i>Logout
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
