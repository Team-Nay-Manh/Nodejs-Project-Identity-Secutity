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
    const correctPath = `/admin/Orders/${orderId}`
    console.log("Navigating to:", correctPath) // Add log for debugging
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
              // Use MongoDB _id for the key
              key={order._id}

              // Pass the MongoDB _id to the handler
              onClick={() => handleRowClick(order._id)}
            >
              <td>
                
                <p>{order.userName || "N/A"}</p> {/* Add fallback */}
              </td>
              <td>
                {/* Use createdAt and format it */}
                {formatDate(order.createdAt)}
              </td>
              <td>
                <span className={`status ${order.status?.toLowerCase()}`}>
                  {order.status || "N/A"} {/* Add fallback */}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No orders found.</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default OrderTable
