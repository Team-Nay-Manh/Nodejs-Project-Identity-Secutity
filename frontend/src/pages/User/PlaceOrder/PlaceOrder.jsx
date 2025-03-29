import { useContext, useState, useEffect, useMemo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames/bind"
import PropTypes from "prop-types"
import { StoreContext } from "../../../context/StoreContext"
import { useAddress } from "./hooks/useAddress"
import { AddressForm } from "./components/AddressForm"
import { CartSummary } from "./components/CartSummary"
import apiRequest from "../../../config/axios"
import styles from "./PlaceOrder.module.scss"
import useAuthStore from "../../../utils/authStore"

const cx = classNames.bind(styles)
const SHIPPING_FEE = 30000

function PlaceOrder() {
  const { btnPay } = useContext(StoreContext)
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { currentUser } = useAuthStore()
  const userId = currentUser?._id

  const {
    formData,
    errors,
    handleChange,
    validateAddress,
    getFormattedAddress,
  } = useAddress()

  const fetchCart = useCallback(async () => {
    if (!userId) {
      setError("User not found. Please login again.")
      setLoading(false)
      return
    }

    try {
      const response = await apiRequest.get(`/api/v1/cart/${userId}`)
      if (response.data && Array.isArray(response.data.data.products)) {
        setCartItems(response.data.data.products)
      } else {
        console.log("Invalid cart data received:", response.data.data)
        setCartItems([])
      }
    } catch (err) {
      console.error("Error fetching cart:", err)
      setError("Failed to load cart. Please try again later.")
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      fetchCart()
    }
  }, [userId, fetchCart])

  const totalAmount = useMemo(() => {
    if (!cartItems || !Array.isArray(cartItems)) {
      console.log("Invalid cartItems:", cartItems)
      return 0
    }
    
    const subtotal = cartItems.reduce(
      (total, item) => {
        if (!item || !item.productId) {
          console.log("Invalid cart item:", item)
          return total
        }
        return total + (item.productId.price || 0) * (item.quantity || 0)
      },
      0
    )
    return subtotal + (subtotal > 0 ? SHIPPING_FEE : 0)
  }, [cartItems])

  const submitFormPay = useCallback(async () => {
    if (!validateAddress()) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await apiRequest.post("/api/v1/order", {
        userId: userId,
        products: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        totalAmount,
        address: getFormattedAddress(),
      })

      if (response.status === 201) {
        btnPay()
        navigate("/")
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }, [
    cartItems,
    totalAmount,
    validateAddress,
    getFormattedAddress,
    btnPay,
    navigate,
    userId
  ])

  if (loading) {
    return (
      <div className={cx("loading-container")}>
        <div className={cx("loading-spinner")}></div>
        <p>Loading your cart...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cx("error-container")}>
        <p className={cx("error-message")}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={cx("retry-button")}
        >
          Try Again
        </button>
      </div>
    )
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
  )
}

PlaceOrder.propTypes = {
  btnPay: PropTypes.func,
}

export default PlaceOrder