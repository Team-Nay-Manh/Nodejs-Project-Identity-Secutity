import React, { useState, useEffect } from "react" 
import OrdersTable from "./OrderTable" 
import { testOrders } from "../../../utils/testOrderData"  // Adjust path if needed or remove if api is fetched
// import "../index.css" 
import "./order.css"
const AllOrders = () => {
  const [orders, setOrders] = useState([]) 

  useEffect(() => {
    setOrders(testOrders) 
  }, []) 

  return (
    <div className="orders">
      <div className="header">
        <i className="bx bx-receipt"></i>
        <h3>All Orders</h3>
        <i className="bx bx-filter"></i>
        <i className="bx bx-search"></i>
      </div>
      <OrdersTable orders={orders} />
    </div>
  ) 
} 
export default AllOrders 
