import { useContext } from "react";
import styles from "./PlaceOrder.module.scss";
import classNames from "classnames/bind";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function PlaceOrder() {
  const { getTotalAmount, btnPay } = useContext(StoreContext);
  const navigate = useNavigate();
  let feeDelivery = getTotalAmount() === 0 ? 0 : 2;

  function submitFormPay() {
    btnPay();
    navigate("/");
  }

  return (
    <form className={cx("place-order")}>
      <div className={cx("place-order-left")}>
        <p className={cx("title")}>Delivery Information</p>
        <div className={cx("multi-fields")}>
          <input type="text" placeholder="Firt Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />
        <div className={cx("multi-fields")}>
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className={cx("multi-fields")}>
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className={cx("place-order-right")}>
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
            <button onClick={submitFormPay}>proceed to checkout</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
