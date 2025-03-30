import React from "react"
import "./order.css"

const OrderDetail = ({ order }) => {
  if (!order) {
    return <div className="order-detail-page">Order not found.</div>
  }

  // Helper to format currency
  const formatCurrency = (amount) => {
    if (typeof amount !== "number") return "N/A"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }
  // Calculate subtotal from items (since it's not in the schema)
  const subtotal =
    order.products?.reduce((sum, item) => {
      return sum + item.quantity * item.price
    }, 0) ?? 0 // Use optional chaining and nullish coalescing for safety
  return (
    <div className="order-detail-page">
      <h2>
        Order Details - ID: {order._id}
        <span className={`status ${order.status?.toLowerCase()}`}>
          {order.status}
        </span>
      </h2>

      <div className="detail-section customer-info">
        <h3>Customer Information</h3>
        <div className="customer-header">
          {order.userImage && (
            <img
              src={order.userImage}
              alt={order.userName}
              className="detail-profile-img"
            />
          )}
          <p>
            <strong>Name:</strong> {order.userName}
          </p>
        </div>
        <p>
          <strong>Email:</strong> {order.email || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {order.phone || "N/A"}
        </p>
      </div>

      <div className="detail-section order-summary">
        <h3>Order Summary</h3>
        <p>
          <strong>Order Created Date:</strong> {order.createdAt}
        </p>
        <p>
          <strong>Payment Method:</strong> {order.paymentMethod || "N/A"}
        </p>
      </div>

      <div className="detail-section items-ordered">
        <h3>Items Ordered</h3>
        {/* Use products array */}
        {order.products && order.products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over products */}
              {order.products.map((item, index) => (
                // Use productId for key (or index if not guaranteed unique in order)
                <tr key={item.productId || index}>
                  <td>
                    {/* Display productName if added to test data, else productId */}
                    {item.productName || `Product ID: ${item.productId}`}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{formatCurrency(item.quantity * item.price)}</td>
                </tr>
              ))}
            </tbody>
            {/* Footer for Subtotal */}
            <tfoot>
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Subtotal:
                </td>
                <td style={{ textAlign: "right", fontWeight: "bold" }}>
                  {formatCurrency(subtotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>No items found for this order.</p>
        )}
      </div>

      <div className="detail-section totals">
        <h3>Totals</h3>
        <p>
          <strong>Subtotal:</strong> {formatCurrency(order.subtotal || 0)}
        </p>
        <p>
          <strong>Shipping:</strong> {formatCurrency(order.shippingCost || 0)}
        </p>
        <p>
          <strong>Tax:</strong> {formatCurrency(order.tax || 0)}
        </p>
        <p>
          <strong>Total Amount:</strong>{" "}
          <strong>{formatCurrency(order.totalAmount || 0)}</strong>
        </p>
      </div>

      <div className="detail-section addresses">
        {/* Use the single address field */}
        <div className="address">
          <h3>Address</h3>
          {order.address ? (
            // Split string into lines for better display, if desired
            order.address.split(", ").map((part, i) => <p key={i}>{part}</p>)
          ) : (
            <p>N/A</p>
          )}
        </div>
        {/* Billing Address section removed */}
      </div>
    </div>
  )
}

export default OrderDetail
