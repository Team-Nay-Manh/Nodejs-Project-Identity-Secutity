
import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { StoreContext } from "../../../context/StoreContext";
import { useAddress } from "./hooks/useAddress";
import { AddressForm } from "./components/AddressForm";
import { CartSummary } from "./components/CartSummary";
import apiClient from "./ApiTest";
import styles from "./PlaceOrder.module.scss";

const cx = classNames.bind(styles);

const TEST_USER_ID = "67e3fdb161d6a5cb0c862d73";
const SHIPPING_FEE = 2;

function PlaceOrder() {
  const { btnPay } = useContext(StoreContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    formData,
    errors,
    handleChange,
    validateAddress,
    getFormattedAddress,
  } = useAddress();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await apiClient.get(`/cart/${TEST_USER_ID}`);
        setCartItems(response.data.data.products);
      } catch (err) {
        setError("Failed to load cart. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const totalAmount = useMemo(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
    return subtotal + (subtotal > 0 ? SHIPPING_FEE : 0);
  }, [cartItems]);

  const submitFormPay = useCallback(async () => {
    if (!validateAddress()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiClient.post("/order", {
        userId: TEST_USER_ID,
        products: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        totalAmount,
        address: getFormattedAddress(),
      });

      if (response.status === 201) {
        btnPay();
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [cartItems, totalAmount, validateAddress, getFormattedAddress, btnPay, navigate]);

  if (loading) {
    return (
      <div className={cx("loading-container")}>
        <div className={cx("loading-spinner")}></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cx("error-container")}>
        <p className={cx("error-message")}>{error}</p>
        <button onClick={() => window.location.reload()} className={cx("retry-button")}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <form className={cx("place-order")} onSubmit={(e) => e.preventDefault()}>
      <AddressForm
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />
      <CartSummary
        cartItems={cartItems}
        totalAmount={totalAmount}
        onSubmit={submitFormPay}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}

PlaceOrder.propTypes = {
  btnPay: PropTypes.func,
};

export default PlaceOrder;