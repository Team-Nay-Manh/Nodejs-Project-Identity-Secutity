import React from "react"
import "../index.css"
import { Link, useLocation } from "react-router-dom"
import SidebarItem from "./SidebarItem"

const menuItem = [
  { to: "Home", icon: <i className='bx bxs-dashboard'></i> },
  { to: "Products", icon: <i className='bx bx-store-alt'></i> },
  { to: "Orders", icon: <i className='bx bx-analyse'></i> },
  { to: "Users", icon: <i className='bx bx-group'></i> }
]

const Sidebar = () => {
  const location = useLocation()
  const pathSegments = location.pathname.split("/")
  const lastSegment = pathSegments[pathSegments.length - 1]

  return (
    <div className='sidebar'>
      <Link to='/' className='logo'>
        <i className='bx bx-code-alt'></i>
        <div className='logo-name'>
          <span>Asmr</span>Prog
        </div>
      </Link>
      <ul className='side-menu'>
        {menuItem.map((item) => (
          <SidebarItem
            to={item.to}
            key={item}
            lastSegment={lastSegment}
            icon={item.icon}
          />
        ))}
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
