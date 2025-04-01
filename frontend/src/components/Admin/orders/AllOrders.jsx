import React, { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
// import "../index.css"
import "./order.css";
import apiRequest from "../../../config/axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = import.meta.env.VITE_API_ENDPOINT;
        if (!apiUrl) {
          throw new Error(
            "API endpoint URL is not configured."
          );
        }

        const response = await apiRequest.get(`${apiUrl}/api/v1/order`);

        if (!response.data.success) {
          throw new Error("API response indicates failure");
        }
  
        
        setOrders(response.data.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.message);
        setOrders([]); // Fallback to an empty array (or testOrders if defined)
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className="orders">
      <div className="header">
        <i className="bx bx-receipt"></i>
        <h3>All Orders</h3>
        <i className="bx bx-filter"></i>
        <i className="bx bx-search"></i>
      </div>
      {/* Pass orders directly */}
      {loading ? (
        <div>Loading orders...</div>
      ) : error ? (
        <div>Error loading orders: {error}</div>
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  );
};

export default AllOrders;
