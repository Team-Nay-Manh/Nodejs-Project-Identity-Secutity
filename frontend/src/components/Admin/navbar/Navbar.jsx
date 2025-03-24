import React from "react"
import "../index.css"

const Navbar = () => (
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
    <input type='checkbox' id='theme-toggle' hidden />
    <label htmlFor='theme-toggle' className='theme-toggle'></label>
    <a href='#' className='notif'>
      <i className='bx bx-bell'></i>
      <span className='count'>12</span>
    </a>
    <a href='#' className='profile'>
      <img src='images/logo.png' alt='profile' />
    </a>
  </nav>
)

export default Navbar
