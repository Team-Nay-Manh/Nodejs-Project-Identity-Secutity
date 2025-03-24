import Cart from "../models/cart.model.js";
import User from "../models/user.models.js";
import Product from "../models/product.model.js";
import HTTP_STATUS from "../config/http-status.js";
import ReturnData from "../models/returnData.model.js";
import handleError from "../config/error-handler.js";

export const addProductToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity || quantity < 1) {
      return handleError(
        res, 
        "Invalid input: userId, productId, and quantity (min 1) are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return handleError(res, "User not found", HTTP_STATUS.NOT_FOUND);
    }

    const product = await Product.findById(productId);
    if (!product) {
      return handleError(res, "Product not found", HTTP_STATUS.NOT_FOUND);
    }

    if (product.stock < quantity) {
      return handleError(
        res, 
        `Insufficient stock: only ${product.stock} items available`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const MAX_QUANTITY = 100;
    if (quantity > MAX_QUANTITY) {
      return handleError(
        res,
        `Quantity exceeds maximum limit of ${MAX_QUANTITY}`,
        HTTP_STATUS.BAD_REQUEST
      );
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
        return handleError(
          res,
          `Insufficient stock: only ${product.stock} items available`,
          HTTP_STATUS.BAD_REQUEST
        );
      }
      cart.products[productIndex].quantity = newQuantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    const returnData = new ReturnData();
    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity || quantity < 1) {
      return handleError(
        res,
        "Invalid input: userId, productId, and quantity (min 1) are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return handleError(res, "Cart not found", HTTP_STATUS.NOT_FOUND);
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex === -1) {
      return handleError(res, "Product not found in cart", HTTP_STATUS.NOT_FOUND);
    }

    const product = await Product.findById(productId);
    if (!product) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      const returnData = new ReturnData();
      returnData.success = true;
      returnData.message = "Product no longer exists and was removed from cart";
      returnData.data = cart;
      return res.status(HTTP_STATUS.OK).json(returnData.toObject());
    }

    if (quantity > product.stock) {
      return handleError(
        res,
        `Insufficient stock: only ${product.stock} items available`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    const returnData = new ReturnData();
    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return handleError(
        res,
        "Invalid input: userId and productId are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return handleError(res, "Cart not found", HTTP_STATUS.NOT_FOUND);
    }

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (productIndex === -1) {
      return handleError(res, "Product not found in cart", HTTP_STATUS.NOT_FOUND);
    }

    cart.products.splice(productIndex, 1);
    await cart.save();
    const returnData = new ReturnData();
    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return handleError(
        res,
        "Invalid input: userId is required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return handleError(res, "Cart not found", HTTP_STATUS.NOT_FOUND);
    }

    cart.products = [];
    await cart.save();
    const returnData = new ReturnData();
    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllProductFromCart = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return handleError(
        res,
        "Invalid input: userId is required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return handleError(res, "User not found", HTTP_STATUS.NOT_FOUND);
    }

    const cart = await Cart.findOne({ userId }).populate('products.productId');

    if (!cart) {
      return handleError(res, "Cart not found", HTTP_STATUS.NOT_FOUND);
    }

    const returnData = new ReturnData();
    returnData.success = true;
    returnData.data = cart;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};