import { Link } from "react-router-dom"

function SidebarItem({ to, lastSegment, className }) {
  return (
    <li className={`${lastSegment === to ? "active" : ""}`}>
      <Link to={`/admin/${to}`}>
        <icon className={className}></icon>
        {to}
      </Link>
    </li>
  )
}

export default SidebarItem
