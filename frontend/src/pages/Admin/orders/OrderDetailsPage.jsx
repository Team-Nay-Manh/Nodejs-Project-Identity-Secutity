import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderDetail from "../../../components/Admin/orders/OrderDetails";
import "../../../components/Admin/orders/order.css";
import apiRequest from "../../../config/axios"

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null); // Xóa các lỗi trước đó

      try {
        // Sử dụng apiRequest thay vì fetch
        const response = await apiRequest.get(`/api/v1/order/${orderId}`);
        
        // Kiểm tra dữ liệu trả về
        if (!response.data.success) {
          throw new Error("API response indicates failure");
        }

        // Đảm bảo trường data tồn tại và chứa thông tin đơn hàng
        if (!response.data.data) {
          throw new Error("Order data not found in API response");
        }

        setOrder(response.data.data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError(err.message || "Có lỗi xảy ra khi tải thông tin đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading order details...</div>;
  if (error && !order) return <div>Error: {error}</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleGoBack} className="btn-go-back">
        ← Return
      </button>

      {order ? (
        <OrderDetail order={order} />
      ) : (
        <div>Order details could not be loaded.</div>
      )}
    </div>
  );
};

export default OrderDetailPage;
