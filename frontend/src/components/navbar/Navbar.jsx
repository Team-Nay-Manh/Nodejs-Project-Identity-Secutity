import { useContext, useState } from "react"
import { assets } from "../../assets/assets.js"
import styles from "./Navbar.module.scss"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { StoreContext } from "../../context/StoreContext.jsx"

const cx = classNames.bind(styles)

const Navbar = () => {
  const [menu, setMenu] = useState("menu")
  const { getTotalAmount, getItemFromCart } = useContext(StoreContext)

  return (
    <div className={cx("navbar")} id='navbar'>
      <Link to='/'>
        <img src={assets.logo} className={cx("logo")} />
      </Link>

      <ul className={cx("navbar__menu")}>
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={cx({ active: menu === "home" })}
        >
          Home
        </Link>
        <a
          href='#explore-menu'
          onClick={() => setMenu("menu")}
          className={cx({ active: menu === "menu" })}
        >
          Menu
        </a>
        <a
          href='#mobile-app'
          onClick={() => setMenu("mobile")}
          className={cx({ active: menu === "mobile" })}
        >
          Mobile-app
        </a>
        <a
          href='#footer'
          onClick={() => setMenu("contact")}
          className={cx({ active: menu === "contact" })}
        >
          Contact us
        </a>
      </ul>
      <div className={cx("navbar__right")}>
        <img src={assets.search_icon} alt='' />
        <Link to='/cart' className={cx("navbar__search-icon")}>
          <img src={assets.basket_icon} alt='' />
          <div className={getTotalAmount() !== 0 ? cx("dot") : ""}>
            {" "}
            {getItemFromCart() !== 0 ? getItemFromCart() : ""}
          </div>
        </Link>

        <Link className={cx("button-login")} to='/login'>
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default Navbar

Navbar.propTypes = {
  setShowLogin: PropTypes.func
}
