import styles from "./FoodList.module.scss"
import classNames from "classnames/bind"
import PropTypes from "prop-types"
import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"
import FoodItem from "./Fooditem"

const cx = classNames.bind(styles)

function FoodList({ category }) {
  const { food_list } = useContext(StoreContext)
  if (!Array.isArray(food_list)) {
    console.error("food_list is not an array:", food_list) // Debugging log
    return <div>No food items available</div>
  }
  const filteredFoodList =
    category === "All"
      ? food_list
      : food_list.filter((food) => food.category.name === category)
  console.log("Filtered food list:", filteredFoodList) // Debugging log

  return (
    <div className={cx("food-display")} id="food-display">
      <h2>Top dishes near you</h2>
      <div className={cx("food-display-list")}>
        {filteredFoodList.map((food) => {
          return (
            <FoodItem
              key={food._id}
              id={food._id}
              name={food.name}
              description={food.description}
              price={food.price}
              image={food.image}
            />
          )
        })}
      </div>
    </div>
  )
}

export default FoodList

FoodList.propTypes = {
  category: PropTypes.string,
}
