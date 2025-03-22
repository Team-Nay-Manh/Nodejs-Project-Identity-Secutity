import Cart from "../models/cart.model.js";
import User from "../models/user.models.js";
import Product from "../models/product.model.js";
const HTTP_STATUS = require("../config/http-status.js");
const ReturnData = require("../models/returnData.model.js");
const handleError = require("../utils/error-handler.js");

/**
 * 1.1 Thêm sản phẩm vào giỏ hàng
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const addProductToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const returnData = new ReturnData();

    if (!userId || !productId || !quantity || quantity < 1) {
      returnData.message =
        "Invalid input: userId, productId, and quantity (min 1) are required";
      return res.status(HTTP_STATUS.BAD_REQUEST).json(returnData.toObject());
    }

    const user = await User.findById(userId);
    if (!user) {
      returnData.message = "User not found";
      return res.status(HTTP_STATUS.NOT_FOUND).json(returnData.toObject());
    }

    const product = await Product.findById(productId);
    if (!product) {
      returnData.message = "Product not found";
      return res.status(HTTP_STATUS.NOT_FOUND).json(returnData.toObject());
    }

    if (product.stock < quantity) {
      returnData.message = `Insufficient stock: only ${product.stock} items available`;
      return res.status(HTTP_STATUS.BAD_REQUEST).json(returnData.toObject());
    }

    const MAX_QUANTITY = 100;
    if (quantity > MAX_QUANTITY) {
      returnData.message = `Quantity exceeds maximum limit of ${MAX_QUANTITY}`;
      return res.status(HTTP_STATUS.BAD_REQUEST).json(returnData.toObject());
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      const newQuantity = cart.products[productIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        returnData.message = `Insufficient stock: only ${product.stock} items available`;
        return res.status(HTTP_STATUS.BAD_REQUEST).json(returnData.toObject());
      }
      cart.products[productIndex].quantity = newQuantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * 1.2 Cập nhật số lượng sản phẩm trong giỏ hàng
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const updateProductQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const returnData = new ReturnData();

    if (!userId || !productId || !quantity || quantity < 1) {
      returnData.message =
        "Invalid input: userId, productId, and quantity (min 1) are required";
      return res.status(HTTP_STATUS.BAD_REQUEST).json(returnData.toObject());
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      returnData.message = "Cart not found";
      return res.status(HTTP_STATUS.NOT_FOUND).json(returnData.toObject());
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex === -1) {
      returnData.message = "Product not found in cart";
      return res.status(HTTP_STATUS.NOT_FOUND).json(returnData.toObject());
    }

    const product = await Product.findById(productId);
    if (!product) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      returnData.success = true;
      returnData.message = "Product no longer exists and was removed from cart";
      returnData.data = cart;
      return res.status(HTTP_STATUS.OK).json(returnData.toObject());
    }

    if (quantity > product.stock) {
      returnData.message = `Insufficient stock: only ${product.stock} items available`;
      return res.status(HTTP_STATUS.BAD_REQUEST).json(returnData.toObject());
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};


/**
 * 1.3 Xóa sản phẩm khỏi giỏ hàng
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const returnData = new ReturnData();

    if (!userId || !productId) {
      returnData.message = "Invalid input: userId and productId are required";
      return res.status(HTTP_STATUS.BAD_REQUEST).json(returnData.toObject());
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      returnData.message = "Cart not found";
      return res.status(HTTP_STATUS.NOT_FOUND).json(returnData.toObject());
    }

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (productIndex === -1) {
      returnData.message = "Product not found in cart";
      return res.status(HTTP_STATUS.NOT_FOUND).json(returnData.toObject());
    }

    cart.products.splice(productIndex, 1);
    await cart.save();
    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * 1.4 Làm trống giỏ hàng
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const returnData = new ReturnData();

    if (!userId) {
      returnData.message = "Invalid input: userId is required";
      return res.status(HTTP_STATUS.BAD_REQUEST).json(returnData.toObject());
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      returnData.message = "Cart not found";
      return res.status(HTTP_STATUS.NOT_FOUND).json(returnData.toObject());
    }

    cart.products = [];
    await cart.save();
    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * 1.5 Lấy tất cả sản phẩm trong giỏ hàng
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {Function} next
 */
export const getAllProductFromCart = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const returnData = new ReturnData();

    if (!userId) {
      returnData.message = "Invalid input: userId is required";
      return res.status(HTTP_STATUS.BAD_REQUEST).json(returnData.toObject());
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      returnData.message = "User not found";
      return res.status(HTTP_STATUS.NOT_FOUND).json(returnData.toObject());
    }

    const cart = await Cart.findOne({ userId }).populate('products.productId');

    if (!cart) {
      returnData.message = "Cart not found";
      return res.status(HTTP_STATUS.NOT_FOUND).json(returnData.toObject());
    }

    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    next(error);
  }
};
