import { Router } from "express"
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller.js"
import { authorize } from "../middlewares/auth.middlewares.js"

const orderRouter = Router()
/**
 * @route POST /api/orders
 * @description Tạo đơn hàng mới
 * @access Private (Người dùng đã đăng nhập)
 */
orderRouter.post("/", authorize, createOrder)

/**
 * @route GET /api/orders
 * @description Lấy danh sách đơn hàng
 * - Admin: Xem tất cả đơn hàng
 * - User: Xem đơn hàng của mình
 * @access Private
 */
orderRouter.get("/", authorize, getOrders)

/**
 * @route PUT /api/orders/:id/status
 * @description Cập nhật trạng thái đơn hàng (Admin only)
 * @access Private (Admin)
 */
orderRouter.put("/:id/status", authorize, updateOrderStatus)

/**
 * @route DELETE /api/orders/:id
 * @description Xóa đơn hàng (Chỉ admin hoặc chủ đơn hàng, đơn chưa hoàn thành)
 * @access Private
 */
orderRouter.delete("/:id", authorize, deleteOrder)
export default orderRouter
