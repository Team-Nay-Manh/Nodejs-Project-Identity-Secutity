import Order from "../models/order.model.js"
import User from "../models/user.models.js"
import HTTP_STATUS from "../config/http-status.js"
import handleError from "../config/error-handler.js"
import ReturnData from "../models/returnData.model.js"
import mongoose from "mongoose"

/**
 * Tạo đơn hàng mới và cập nhật địa chỉ người dùng
 * @param {Object} req - Request object
 * @param {string} req.body.userId - ID người dùng
 * @param {Array} req.body.products - Danh sách sản phẩm
 * @param {number} req.body.totalAmount - Tổng tiền
 * @param {string} req.body.address - Địa chỉ giao hàng
 * @param {Object} res - Response object
 */

export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, address } = req.body

    if (!userId || !products?.length || !totalAmount || !address) {
      throw new Error("Missing required fields")
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const newOrder = await Order.create(
        [
          {
            userId,
            products,
            totalAmount,
            address,
            status: "pending",
          },
        ],
        { session }
      )

      const user = await User.findById(userId).session(session)
      if (!user) throw new Error("User not found")

      if (user.address !== address) {
        user.address = address
        await user.save({ session })
      }
      await session.commitTransaction()
      session.endSession()

      const returnData = new ReturnData()
      returnData.success = true
      returnData.message = "Order created successfully"
      returnData.data = newOrder[0]
      return res.status(HTTP_STATUS.CREATED).json(returnData.toObject())
    } catch (error) {
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Lấy danh sách đơn hàng (admin) hoặc đơn hàng của người dùng
 * @param {Object} req - Request object
 * @param {string} req.query.status - Lọc theo trạng thái
 * @param {number} req.query.page - Trang hiện tại
 * @param {number} req.query.limit - Số lượng đơn hàng/trang
 * @param {Object} res - Response object
 */
export const getOrders = async (req, res) => {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const query = {};
  
      // Chỉ admin mới xem được tất cả đơn hàng
      if (req.user.role !== "admin") {
        query.userId = req.user._id;
      }
  
      if (status) {
        query.status = status;
      }
  
      const orders = await Order.find(query)
        .populate("userId", "username email")
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip((page - 1) * limit);
  
      const returnData = new ReturnData();
      returnData.success = true;
      returnData.data = orders;
      return res.status(HTTP_STATUS.OK).json(returnData.toObject());
    } catch (error) {
      handleError(res, error);
    }
  };
  
  /**
   * Cập nhật trạng thái đơn hàng (admin only)
   * @param {Object} req - Request object
   * @param {string} req.params.id - ID đơn hàng
   * @param {string} req.body.status - Trạng thái mới (pending/completed/cancelled)
   * @param {Object} res - Response object
   */
  export const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Chỉ admin mới được cập nhật
      if (req.user.role !== "admin") {
        throw new Error("Forbidden: Admin only", { cause: HTTP_STATUS.FORBIDDEN });
      }
  
      // Kiểm tra trạng thái hợp lệ
      if (!["pending", "completed", "cancelled"].includes(status)) {
        throw new Error("Invalid status");
      }
  
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updatedOrder) {
        throw new Error("Order not found", { cause: HTTP_STATUS.NOT_FOUND });
      }
  
      const returnData = new ReturnData();
      returnData.success = true;
      returnData.message = "Order status updated";
      returnData.data = updatedOrder;
      return res.status(HTTP_STATUS.OK).json(returnData.toObject());
    } catch (error) {
      handleError(res, error);
    }
  };
  
  /**
   * Xóa đơn hàng (chỉ khi chưa hoàn thành)
   * @param {Object} req - Request object
   * @param {string} req.params.id - ID đơn hàng
   * @param {Object} res - Response object
   */
  export const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Chỉ admin hoặc chủ đơn hàng mới được xóa
      const order = await Order.findById(id);
      if (!order) {
        throw new Error("Order not found", { cause: HTTP_STATUS.NOT_FOUND });
      }
  
      if (req.user.role !== "admin" && req.user._id.toString() !== order.userId.toString()) {
        throw new Error("Forbidden", { cause: HTTP_STATUS.FORBIDDEN });
      }
  
      // Chỉ xóa khi đơn chưa hoàn thành
      if (order.status === "completed") {
        throw new Error("Cannot delete completed order");
      }
  
      await Order.findByIdAndDelete(id);
  
      const returnData = new ReturnData();
      returnData.success = true;
      returnData.message = "Order deleted successfully";
      return res.status(HTTP_STATUS.OK).json(returnData.toObject());
    } catch (error) {
      handleError(res, error);
    }
  };
  /**
  * Lấy chi tiết đơn hàng theo ID
  * @param {Object} req - Request object
  * @param {string} req.params.id - ID đơn hàng cần lấy
  * @param {Object} res - Response object
  */
 export const getOrderById = async (req, res) => {
   try {
     const { id } = req.params;

     if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Order ID format", { cause: HTTP_STATUS.BAD_REQUEST });
     }

     const order = await Order.findById(id)
      .populate("userId", "username email address"); 
 

     if (!order) {
       throw new Error("Order not found", { cause: HTTP_STATUS.NOT_FOUND });
     }

     if (req.user.role !== "admin" && req.user._id.toString() !== order.userId._id.toString()) {

        throw new Error("Forbidden: You are not authorized to view this order", { cause: HTTP_STATUS.FORBIDDEN });
     }
  
     const returnData = new ReturnData();
     returnData.success = true;
     returnData.message = "Order details retrieved successfully";
     returnData.data = order;
     return res.status(HTTP_STATUS.OK).json(returnData.toObject());
 
   } catch (error) {
     handleError(res, error);
   }
 };