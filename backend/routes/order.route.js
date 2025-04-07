import { Router } from "express"
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById
} from "../controllers/order.controller.js"
import { authorize } from "../middlewares/auth.middlewares.js"

const orderRouter = Router()

orderRouter.post("/", authorize, createOrder)
orderRouter.get("/", authorize, getOrders)
orderRouter.get("/:id", authorize, getOrderById)
orderRouter.put("/:id/status", authorize, updateOrderStatus)
orderRouter.delete("/:id", authorize, deleteOrder)
orderRouter.delete("/update", authorize, deleteOrder)
export default orderRouter
