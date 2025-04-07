import { useEffect, useState } from "react"
import { getUserOrders } from "../../../services/orderService"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import "./OrderHistory.css"

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await getUserOrders()
        setOrders(response.data)
      } catch (err) {
        console.error("Failed to fetch orders:", err)
        setError(err.message || "Failed to fetch orders")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const formatDate = (isoString) => {
    if (!isoString) return "N/A"
    try {
      return format(new Date(isoString), "dd MMM yyyy")
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid Date"
    }
  }

  const handleOrderClick = (orderId) => {
    navigate(`/order-details/${orderId}`)
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

  return (
    <div className="order-history-container">
      <h2>My Orders</h2>

      {loading ? (
        <div className="loading-message">Loading orders...</div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : orders.length === 0 ? (
        <div className="no-orders-message">
          <p>You haven't placed any orders yet.</p>
          <button onClick={() => navigate("/")}>Start Shopping</button>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Delivery Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleOrderClick(order._id)}
                  className="order-row"
                >
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{formatCurrency(order.totalAmount || 0)}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(order.status)}`}
                    >
                      {order.status?.toUpperCase() || "N/A"}
                    </span>
                  </td>
                  <td className="address-cell">{order.address || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default OrderHistory
