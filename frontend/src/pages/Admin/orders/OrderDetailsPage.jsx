import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import OrderDetail from "../../../components/Admin/orders/OrderDetails"
import { testOrders } from "../../../utils/testOrderData"
import "../../../components/Admin/orders/order.css"

const OrderDetailPage = () => {

  const { orderId } = useParams()

  const navigate = useNavigate()

  const [order, setOrder] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Find the order in your test data (replace with API call in real app)
    const foundOrder = testOrders.find((o) => o._id === orderId)

    setOrder(foundOrder)

    setLoading(false)

  }, [orderId])
  const handleGoBack = () => {
    navigate(-1)
  } 
  if (loading) return <div>Loading order details...</div>
  if (!order) return <div>Order not found.</div>

  
  return (
    // It's good practice to wrap page content in a container if needed
    <div style={{ padding: '20px' }}> {/* Example padding */}

      {/* Add the Back Button */}
      <button onClick={handleGoBack} className="btn-go-back">
        ← Return
      </button>

      {/* Render the OrderDetail component if order exists */}
      {order ? (
        <OrderDetail order={order} />
      ) : (
        // This case should ideally be caught by the 'error' state above,
        // but kept as a fallback
        <div>Order details could not be loaded.</div>
      )}

    </div>
  ) 
} 

export default OrderDetailPage 
