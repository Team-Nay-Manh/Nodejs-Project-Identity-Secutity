import { useEffect, useState } from "react";
import apiRequest from "../../../config/axios"

const OrderDetail = ({ order }) => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiRequest.get('/api/v1/products/');
        
        if (!response.data.success) {
          throw new Error("API response indicates failure");
        }

        if (!Array.isArray(response.data.data?.products)) {
          throw new Error("Invalid product data format");
        }

        setProducts(response.data.data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message || "Có lỗi xảy ra khi tải danh sách sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  if (!order) {
    return <div className="order-detail-page">Order not found.</div>;
  }

  // Helper to format currency
  const formatCurrency = (amount) => {
    if (typeof amount !== "number") return "N/A";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Calculate subtotal from order.products
  const subtotal =
    order.products?.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0) ?? 0;

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
          <p>
            <strong>Name:</strong> {order.userId?.username || "N/A"}
          </p>
        </div>
        <p>
          <strong>Email:</strong> {order.userId?.email || "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {order.userId?.address || "N/A"}
        </p>
        <p>
          <strong>Order Created Date:</strong> {order.createdAt}
        </p>
      </div>
      <div className="detail-section items-ordered">
        <h3>Items Ordered</h3>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error fetching products: {error}</p>
        ) : order.products && order.products.length > 0 ? (
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
              {order.products.map((item, index) => {
                // Find the matching product from the fetched products array
                const product = products.find((p) => p._id === item.productId);
                return (
                  <tr key={item._id || index}>
                    <td>
                      {/* Display product name if available, otherwise fallback */}
                      {product?.name || `Product ID: ${item.productId}`}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{formatCurrency(item.quantity * item.price)}</td>
                  </tr>
                );
              })}
            </tbody>
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
          <strong>Total Amount:</strong>{" "}
          <strong>{formatCurrency(order.totalAmount || 0)}</strong>
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;