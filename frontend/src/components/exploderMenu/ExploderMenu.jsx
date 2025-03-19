import styles from "./ExploderMenu.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { menu_list } from "../../assets/assets";

const cx = classNames.bind(styles);

function ExploderMenu({ category, setCategory }) {
  return (
    <div className={cx("container")} id="explore-menu">
      <h1>Explore our menu</h1>
      <p className={cx("explore-menu-text")}>
        Choose from diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time
      </p>
      <div className={cx("explore-menu-list")}>
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((pre) =>
                pre === item.menu_name ? "All" : item.menu_name
              )
            }
            className={cx("explore-menu-list-item")}
            key={index}
          >
            <img
              className={category === item.menu_name ? cx("active") : ""}
              src={item.menu_image}
              alt="Item menu"
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploderMenu;

ExploderMenu.propTypes = {
  category: PropTypes.string,
  setCategory: PropTypes.func,
};
