import classNames from "classnames/bind"
import PropTypes from "prop-types"
import { useContext, useState, useRef, useEffect } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { assets } from "../../assets/assets.js"
import { StoreContext } from "../../context/StoreContext.jsx"
import useAuthStore from "../../utils/authStore.js"
import { searchProducts } from "../../services/productService.js"
import styles from "./Navbar.module.scss"

const cx = classNames.bind(styles)

const Navbar = () => {
  const [menu, setMenu] = useState("menu")
  const {
    getTotalAmount,
    getItemFromCart,
    addToCart,
    removeFromCart,
    cartItem,
  } = useContext(StoreContext)
  const { currentUser, removeCurrentUser } = useAuthStore()

  const [open, setOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim().length > 0) {
      setLoading(true)
      try {
        const results = await searchProducts(query)
        setSearchResults(results)
      } catch (error) {
        console.error("Error searching products:", error)
        toast.error("Error searching foods")
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    } else {
      setSearchResults([])
    }
  }

  const handleLogout = () => {
    setOpen(false)
    removeCurrentUser()
    toast.success("Logout Successfully!!!")
  }

  return (
    <div className={cx("navbar")} id="navbar">
      <Link to="/">
        <img src={assets.logo} className={cx("logo")} />
      </Link>

      <ul className={cx("navbar__menu")}>
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={cx({ active: menu === "home" })}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={cx({ active: menu === "menu" })}
        >
          Menu
        </a>
        <a
          href="#mobile-app"
          onClick={() => setMenu("mobile")}
          className={cx({ active: menu === "mobile" })}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={cx({ active: menu === "contact" })}
        >
          Contact us
        </a>
      </ul>
      <div className={cx("navbar__right")}>
        <div className={cx("search-container")} ref={searchRef}>
          {showSearch ? (
            <div className={cx("search-bar")}>
              <input
                type="text"
                placeholder="Search foods..."
                value={searchQuery}
                onChange={handleSearch}
                autoFocus
              />
              <img
                src={assets.search_icon}
                alt="Search"
                className={cx("search-icon")}
                onClick={() => setShowSearch(false)}
              />
            </div>
          ) : (
            <img
              src={assets.search_icon}
              alt="Search"
              onClick={() => setShowSearch(true)}
              className={cx("search-icon")}
            />
          )}

          {showSearch && searchQuery.trim() !== "" && (
            <div className={cx("search-dropdown")}>
              {loading ? (
                <div className={cx("loading")}>Searching...</div>
              ) : searchResults.length > 0 ? (
                <ul className={cx("search-results")}>
                  {searchResults.map((product) => (
                    <li key={product._id} className={cx("search-item")}>
                      <div className={cx("product-info")}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={cx("product-image")}
                        />
                        <div className={cx("product-details")}>
                          <h3>{product.name}</h3>
                          <p className={cx("product-category")}>
                            {product.category.name}
                          </p>
                          <p className={cx("product-price")}>
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <div className={cx("product-controls")}>
                        {!cartItem[product._id] ? (
                          <img
                            className={cx("add-icon")}
                            onClick={() => addToCart(product._id)}
                            src={assets.add_icon_white}
                            alt="Add"
                          />
                        ) : (
                          <div className={cx("quantity-counter")}>
                            <img
                              onClick={() => removeFromCart(product._id)}
                              src={assets.remove_icon_red}
                              alt="Remove"
                            />
                            <p>{cartItem[product._id]}</p>
                            <img
                              onClick={() => addToCart(product._id)}
                              src={assets.add_icon_green}
                              alt="Add"
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={cx("no-results")}>
                  <img
                    src={assets.no_results_icon || assets.search_icon}
                    alt="No results"
                    className={cx("no-results-icon")}
                  />
                  <p className={cx("no-results-title")}>
                    No matching products found
                  </p>
                  <p className={cx("no-results-message")}>
                    Try different keywords or check our menu for available items
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <Link to="/cart" className={cx("navbar__search-icon")}>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalAmount() !== 0 ? cx("dot") : ""}>
            {" "}
            {getItemFromCart() !== 0 ? getItemFromCart() : ""}
          </div>
        </Link>

        {currentUser ? (
          <div className={cx("avatar")}>
            <img
              src={assets.noAvatar}
              alt="avatar"
              className={cx("avatar_img")}
              onClick={() => setOpen((pre) => !pre)}
            />
            {open && (
              <section className={cx("avatar_dropdown")}>
                <ul className={cx("dropdown_list")}>
                  <li className={cx("dropdown_item")} onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </section>
            )}
          </div>
        ) : (
          <Link className={cx("button-login")} to="/login">
            Sign in
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar

Navbar.propTypes = {
  setShowLogin: PropTypes.func,
}
