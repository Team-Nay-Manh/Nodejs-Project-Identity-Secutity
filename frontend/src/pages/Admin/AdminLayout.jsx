import { Outlet } from "react-router-dom"
import Navbar from "../../components/Admin/navbar/Navbar"
import SideBar from "../../components/Admin/sidebar/SideBar"
import "./index.css"

function AdminLayout() {
  return (
      <div>
        <SideBar />
        <div className='content'>
          <Navbar />
          <Outlet />
        </div>
      </div>
  )
}

export default AdminLayout
