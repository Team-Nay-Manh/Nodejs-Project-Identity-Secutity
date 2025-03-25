import React from "react"
import "./header.css"

function Header() {
  return (
    <div className='header'>
      <div className='left'>
        <h1>Dashboard</h1>
        <ul className='breadcrumb'>
          <li>
            <a href='#'> Analytics </a>
          </li>
          /
          <li>
            <a href='#' className='active'>
              Shop
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
