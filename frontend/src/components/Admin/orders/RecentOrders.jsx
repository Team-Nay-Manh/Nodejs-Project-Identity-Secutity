import React, { useState, useEffect } from "react" 
import OrdersTable from "./OrderTable" 
import "./order.css" 
import { testOrders } from "../../../utils/testOrderData" 

const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]) 

  const getDate = (isoString) => new Date(isoString) 
  useEffect(() => {
    const allOrders = [...testOrders] 

    // Sort orders by createdAt date descending (newest first)
    const sortedOrders = allOrders.sort((a, b) => {
      // Compare Date objects for reliable sorting
      return getDate(b.createdAt) - getDate(a.createdAt) 
    }) 

    // Take only the first 3 elements
    const top3Recent = sortedOrders.slice(0, 3) 

    setRecentOrders(top3Recent) 
  }, []) 

  return (
    <div className="orders">
      <div className="header">
        <i className="bx bx-receipt"></i>
        <h3>Recent Orders</h3>
        <i className="bx bx-filter"></i>
        <i className="bx bx-search"></i>
      </div>
      <OrdersTable orders={recentOrders} />
    </div>
  ) 
} 

export default RecentOrders 
