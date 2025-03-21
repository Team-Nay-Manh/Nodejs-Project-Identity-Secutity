import Cart from "../models/cart.model.js"
import User from "../models/user.models.js"
import Product from "../models/product.model.js";

// Hằng số cho mã trạng thái HTTP
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

// Hàm tiện ích xử lý lỗi
const handleError = (res, error, status = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
  console.error(error);
  res.status(status).json({ success: false, message: error.message });
};

/**
 * 1.1 Thêm sản phẩm vào giỏ hàng
 * @route POST /cart/add
 */
export const addProductToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!userId || !productId || !quantity || quantity < 1) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid input: userId, productId, and quantity (min 1) are required",
      });
    }

    // Kiểm tra user tồn tại
    const user = await User.findById(userId);
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "User not found" });
    }

    // Kiểm tra sản phẩm tồn tại
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "Product not found" });
    }

    // Kiểm tra tồn kho
    if (product.stock < quantity) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: `Insufficient stock: only ${product.stock} items available`,
      });
    }

    // Giới hạn số lượng tối đa (ví dụ: 100)
    const MAX_QUANTITY = 100;
    if (quantity > MAX_QUANTITY) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: `Quantity exceeds maximum limit of ${MAX_QUANTITY}`,
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (productIndex > -1) {
      const newQuantity = cart.products[productIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: `Insufficient stock: only ${product.stock} items available`,
        });
      }
      cart.products[productIndex].quantity = newQuantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(HTTP_STATUS.OK).json({ success: true, data: cart });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * 1.2 Cập nhật số lượng sản phẩm trong giỏ hàng
 * @route PUT /cart/update
 */
export const updateProductQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity || quantity < 1) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid input: userId, productId, and quantity (min 1) are required",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (productIndex === -1) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      cart.products.splice(productIndex, 1); // Xóa sản phẩm nếu không còn tồn tại
      await cart.save();
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Product no longer exists and was removed from cart",
        data: cart,
      });
    }

    // Kiểm tra tồn kho
    if (quantity > product.stock) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: `Insufficient stock: only ${product.stock} items available`,
      });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.status(HTTP_STATUS.OK).json({ success: true, data: cart });
  } catch (error) {
    handleError(res, error);
  }
};


/**
 * 1.3 Xóa sản phẩm khỏi giỏ hàng
 * @route DELETE /cart/remove
 */
export const removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid input: userId and productId are required",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (productIndex === -1) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.products.splice(productIndex, 1);
    await cart.save();
    res.status(HTTP_STATUS.OK).json({ success: true, data: cart });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * 1.4 Làm trống giỏ hàng
 * @route DELETE /cart/clear
 */
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid input: userId is required",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();
    res.status(HTTP_STATUS.OK).json({ success: true, data: cart });
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllProductFromCart = async (req, res, next) => {
  try {
    const { userId } = req.body
    const user = await User.findOne({ _id: userId })
    if (!user) {
      const error = new Error("User not found")
      error.status = 404
      throw error
    }

    const cart = Cart.findOne({ userId })
    if (!cart) {
      const error = new Error("Cart not found")
      error.status = 404
      throw error
    }

    res.status(200).json({
      success: true,
      data: { cart }
    })
  } catch (error) {
    next(error)
  }
}
