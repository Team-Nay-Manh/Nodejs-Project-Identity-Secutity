import { Link } from "react-router-dom"

function SidebarItem({ to, lastSegment, icon }) {
  return (
    <li className={`${lastSegment === to ? "active" : ""}`}>
      <Link to={`/admin/${to}`}>
        {icon}
        {to}
      </Link>
    </li>
  )
}

export default SidebarItem
