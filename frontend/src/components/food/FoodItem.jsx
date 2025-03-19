import styles from "./FoodList.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const cx = classNames.bind(styles);

function FoodItem({ id, name, price, description, image }) {
  const { cartItem, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className={cx("food-item")}>
      <div className={cx("food-item-img-container")}>
        <img className={cx("food-item-image")} src={image} alt="fooditem" />
        {!cartItem[id] ? (
          <img
            className={cx("add")}
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className={cx("food-item-counter")}>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
            />
            <p>{cartItem[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
          </div>
        )}
      </div>
      <div className={cx("food-item-info")}>
        <div className={cx("food-item-info-name-rating")}>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className={cx("food-item-info-des")}>{description}</p>
        <p className={cx("food-item-info-price")}>${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;

FoodItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  image: PropTypes.string,
};
