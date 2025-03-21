import { useContext } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Cart() {
  const { cartItem, food_list, removeFromCart, getTotalAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();
  let feeDelivery = getTotalAmount() === 0 ? 0 : 2;

  return (
    <div className={cx("cart")}>
      <div className={cx("cart-items")}>
        <div className={cx("cart-items-title")}>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((food, index) => {
          if (cartItem[food._id] > 0) {
            return (
              <div key={index}>
                <div className={cx("cart-items-title", "cart-items-item")}>
                  <img src={food.image} alt="Food" />
                  <p>{food.name}</p>
                  <p>${food.price}</p>
                  <p>{cartItem[food._id]}</p>
                  <p>${food.price * cartItem[food._id]}</p>
                  <p
                    onClick={() => removeFromCart(food._id)}
                    className={cx("remove")}
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className={cx("cart-bottom")}>
        <div className={cx("cart-total")}>
          <h2>Cart Total</h2>
          <div>
            <div className={cx("cart-total-details")}>
              <p>Subtoal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className={cx("cart-total-details")}>
              <p>Delivery Fee</p>
              <p>${feeDelivery}</p>
            </div>
            <hr />
            <div className={cx("cart-total-details")}>
              <b>Total</b>
              <b>${getTotalAmount() + feeDelivery}</b>
            </div>
            <button onClick={() => navigate("/order")}>
              proceed to checkout
            </button>
          </div>
        </div>
        <div className={cx("cart-promocode")}>
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className={cx("cart-promocode-input")}>
              <input type="text" placeholder="PromoCode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
