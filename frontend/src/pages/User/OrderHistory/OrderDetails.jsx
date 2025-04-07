import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getOrderById } from "../../../services/orderService"
import { format } from "date-fns"
import "./OrderDetails.css"

const OrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await getOrderById(orderId)
        setOrder(response.data)
        console.log("Order data:", response.data)
      } catch (err) {
        console.error("Failed to fetch order details:", err)
        setError(err.message || "Failed to fetch order details")
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])

  const formatDate = (isoString) => {
    if (!isoString) return "N/A"
    try {
      return format(new Date(isoString), "dd MMM yyyy, HH:mm")
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid Date"
    }
  }

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "status-completed"
      case "pending":
        return "status-pending"
      case "cancelled":
        return "status-cancelled"
      default:
        return "status-unknown"
    }
  }

  // Format currency to Vietnamese dong
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + "₫"
  }

  // Calculate subtotal from individual products
  const calculateSubtotal = () => {
    if (!order || !order.products || !order.products.length) return 0
    return order.products.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0)
    }, 0)
  }

  // Calculate shipping fee
  const getShippingFee = () => {
    // Assuming shipping fee is the difference between totalAmount and subtotal
    const subtotal = calculateSubtotal()
    const shippingFee = (order?.totalAmount || 0) - subtotal
    return Math.max(0, shippingFee) // Ensure it's not negative
  }

  if (loading) {
    return <div className="loading-container">Loading order details...</div>
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => navigate("/my-orders")}>Back to Orders</button>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="not-found-container">
        <h3>Order Not Found</h3>
        <p>
          The order you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
        <button onClick={() => navigate("/my-orders")}>Back to Orders</button>
      </div>
    )
  }

  const subtotal = calculateSubtotal()
  const shippingFee = getShippingFee()

  return (
    <div className="order-details-container">
      <div className="order-header">
        <button className="back-button" onClick={() => navigate("/my-orders")}>
          ← Back to Orders
        </button>
        <h2>Order Details</h2>
        <div className="order-meta">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(order.createdAt)}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status-badge ${getStatusClass(order.status)}`}>
              {order.status?.toUpperCase() || "N/A"}
            </span>
          </p>
        </div>
      </div>

      <div className="order-section">
        <h3>Delivery Address</h3>
        <p>{order.address}</p>
      </div>

      <div className="order-section">
        <h3>Order Items</h3>
        <div className="order-items-container">
          {order.products && order.products.length > 0 ? (
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((item, index) => (
                  <tr key={index} className="order-item">
                    <td className="product-info">
                      {item.productId?.image && (
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="product-thumbnail"
                        />
                      )}
                      <span>{item.productId?.name || "Unknown Product"}</span>
                    </td>
                    <td>{formatCurrency(item.price || 0)}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {formatCurrency((item.price || 0) * (item.quantity || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items in this order.</p>
          )}
        </div>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>{shippingFee > 0 ? formatCurrency(shippingFee) : "Free"}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>{formatCurrency(order.totalAmount || 0)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
