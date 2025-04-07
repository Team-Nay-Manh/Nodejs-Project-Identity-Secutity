import React from "react"
// import "../index.css"
import "./order.css"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns" //npm install date-fns
import "../index.css"

const formatDate = (isoString) => {
  if (!isoString) return "N/A"
  try {
    // Adjust format string as needed (e.g., 'dd-MM-yyyy', 'PP')
    return format(new Date(isoString), "dd MMM yyyy")
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

const OrderTable = ({ orders }) => {
  const navigateTo = useNavigate()

  const handleRowClick = (orderId) => {
    // Make sure this path matches your router configuration
    const correctPath = `/admin/order-details/${orderId}`
    console.log("Navigating to:", correctPath)
    navigateTo(correctPath)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Order Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <tr
              key={order._id}
              onClick={() => handleRowClick(order._id)}
              className='order-row' // Add a class for styling hover effects
            >
              <td>
                <p>{order.userId?.username || "N/A"}</p>
              </td>
              <td>{formatDate(order.createdAt)}</td>
              <td>
                <span
                  className={`status ${
                    order.status?.toLowerCase() || "unknown"
                  }`}
                >
                  {order.status ? order.status.toUpperCase() : "N/A"}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan='3'>No orders found.</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default OrderTable
