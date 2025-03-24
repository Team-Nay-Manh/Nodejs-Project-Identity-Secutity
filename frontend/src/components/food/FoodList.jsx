import styles from "./FoodList.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "./Fooditem";

const cx = classNames.bind(styles);

function FoodList({ category }) {
  const { food_list } = useContext(StoreContext);

  return (
    <div className={cx("food-display")} id="food-display">
      <h2>Top dishes near you</h2>
      <div className={cx("food-display-list")}>
        {food_list.map((food, index) => {
          if (category === "All" || category === food.category) {
            return (
              <FoodItem
                key={index}
                id={food._id}
                name={food.name}
                description={food.description}
                price={food.price}
                image={food.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default FoodList;

FoodList.propTypes = {
  category: PropTypes.string,
};
