import React, { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
import "./order.css";
import apiRequest from "../../../config/axios";
const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDate = (isoString) => new Date(isoString);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = import.meta.env.VITE_API_ENDPOINT;
        if (!apiUrl) {
          throw new Error("API endpoint URL is not configured.");
        }

        const response = await apiRequest.get(`${apiUrl}/api/v1/order`);

        if (!response.data.success) {
          throw new Error("API response indicates failure");
        }
        const allRecentOrders = [...response.data.data];
        const sortedOrders = allRecentOrders.sort((a, b) => {
          // Compare Date objects for reliable sorting
          return getDate(b.createdAt) - getDate(a.createdAt);
        });
        //   // Take only the first 3 elements
        const top3Recent = sortedOrders.slice(0, 3);

        setRecentOrders(top3Recent);

        // } else {
        //   throw new Error("API response indicates failure");
        // }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.message);
        setRecentOrders([]);
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
        <OrderTable orders={recentOrders} />
      )}
    </div>
  );
};

export default RecentOrders;
