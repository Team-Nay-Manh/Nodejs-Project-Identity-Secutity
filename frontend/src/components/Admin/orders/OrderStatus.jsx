import React, { useState } from "react"
import { Select } from "antd"

const OrderStatus = ({ status, onStatusChange, orderId }) => {
  const [statusValue, setStatusValue] = useState(status)
  const handleStatusChange = (newStatus) => {
    console.log(newStatus)
    if (onStatusChange && orderId) {
      onStatusChange({ orderId, status: newStatus })
      setStatusValue(newStatus)
    }
  }

  return (
    <Select
      value={statusValue}
      onChange={handleStatusChange}
      style={{ width: 150 }}
      disabled={onStatusChange?.isPending}
    >
      <Select.Option value='pending' style={{ color: "#faad14" }}>
        Đang xử lý
      </Select.Option>
      <Select.Option value='completed' style={{ color: "#52c41a" }}>
        Đã hoàn thành
      </Select.Option>
      <Select.Option value='cancelled' style={{ color: "#ff4d4f" }}>
        Đã hủy
      </Select.Option>
    </Select>
  )
}

export default OrderStatus
