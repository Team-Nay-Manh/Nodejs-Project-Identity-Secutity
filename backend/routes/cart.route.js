import { Router } from "express"
import {
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
  clearCart,
  getAllProductFromCart,
} from "../controllers/cart.controller.js"

import { authorize } from "../middlewares/auth.middlewares.js"

const cartRouter = Router()

/**
 * @route POST /api/carts/:userId/products
 * @description Thêm sản phẩm vào giỏ hàng
 * @access Private (Người dùng đã đăng nhập)
 */
cartRouter.post("/:userId/products", authorize, addProductToCart)

/**
 * @route GET /api/carts/:userId
 * @description Lấy thông tin giỏ hàng của người dùng
 * @access Private
 */
cartRouter.get("/:userId", authorize, getAllProductFromCart)

/**
 * @route PUT /api/carts/:userId/products/:productId
 * @description Cập nhật số lượng sản phẩm trong giỏ
 * @access Private
 */
cartRouter.put(
  "/:userId/products/:productId",
  authorize,
  updateProductQuantity
)

/**
 * @route DELETE /api/carts/:userId/products/:productId
 * @description Xóa sản phẩm khỏi giỏ hàng
 * @access Private
 */
cartRouter.delete(
  "/:userId/products/:productId",
  authorize,
  removeProductFromCart
)

/**
 * @route DELETE /api/carts/:userId
 * @description Xóa toàn bộ giỏ hàng
 * @access Private
 */
cartRouter.delete("/:userId", authorize, clearCart)

export default cartRouter
