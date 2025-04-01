import React from "react"
import "../index.css"
import "./order.css"
const Orders = () => (
  <div className='orders'>
    <div className='header'>
      <i className='bx bx-receipt'></i>
      <h3>Recent Orders</h3>
      <i className='bx bx-filter'></i>
      <i className='bx bx-search'></i>
    </div>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Order Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {["Completed", "Pending", "Processing"].map((status, index) => (
          <tr key={index}>
            <td>
              <img src='/noAvatar.png' alt='profile' />
              <p>John Doe</p>
            </td>
            <td>14-08-2023</td>
            <td>
              <span className={`status ${status.toLowerCase()}`}>{status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default Orders
