import styles from "./ExploderMenu.module.scss"
import classNames from "classnames/bind"
import PropTypes from "prop-types"
import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const cx = classNames.bind(styles)

function ExploderMenu({ category, setCategory }) {
  const { categories } = useContext(StoreContext) // Get categories from context

  return (
    <div className={cx("container")} id="explore-menu">
      <h1>Explore our menu</h1>
      <p className={cx("explore-menu-text")}>
        Choose from diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time
      </p>
      <div className={cx("explore-menu-list")}>
        {categories.map((item) => (
          <div
            onClick={() =>
              setCategory((pre) => (pre === item.name ? "All" : item.name))
            }
            className={cx("explore-menu-list-item")}
            key={item._id}
          >
            <img
              className={category === item.name ? cx("active") : ""}
              src={item.image}
              alt="Item menu"
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default ExploderMenu

ExploderMenu.propTypes = {
  category: PropTypes.string,
  setCategory: PropTypes.func,
}
