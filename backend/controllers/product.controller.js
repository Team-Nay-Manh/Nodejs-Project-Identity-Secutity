import Product from "../models/product.model.js";
import ReturnData from "../models/returnData.model.js";
import HTTP_STATUS from "../config/http-status.js";
import handleError from "../config/error-handler.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    const returnData = new ReturnData();
    returnData.success = true;
    returnData.message = "Get products successfully";
    returnData.data = products;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return handleError(res, "Product not found", HTTP_STATUS.NOT_FOUND);
    }

    const returnData = new ReturnData();
    returnData.success = true;
    returnData.message = "Get product successfully";
    returnData.data = product;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;
    if (!name || !price || stock === undefined) {
      return handleError(
        res,
        "Name, price, and stock are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const imageUrl = req.files?.imageUrl ? req.files.imageUrl[0].path : null;
    const detailImages =
      req.files?.detailImages?.map((file) => file.path) || [];

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
      detailImages,
    });

    const returnData = new ReturnData();
    returnData.success = true;
    returnData.message = "Product created successfully";
    returnData.data = newProduct;
    res.status(HTTP_STATUS.CREATED).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, description, price, stock, category } = req.body;

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return handleError(res, "Product not found", HTTP_STATUS.NOT_FOUND);
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock !== undefined ? stock : product.stock;
    product.category = category || product.category;
    product.imageUrl = req.files?.imageUrl
      ? req.files.imageUrl[0].path
      : product.imageUrl;
    product.detailImages = req.files?.detailImages
      ? [
          ...product.detailImages,
          ...req.files.detailImages.map((file) => file.path),
        ]
      : product.detailImages;

    await product.save();

    const returnData = new ReturnData();
    returnData.success = true;
    returnData.message = "Product updated successfully";
    returnData.data = product;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return handleError(res, "Product not found", HTTP_STATUS.NOT_FOUND);
    }

    await Product.deleteOne({ _id: productId });

    const returnData = new ReturnData();
    returnData.success = true;
    returnData.message = "Product deleted successfully";
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return handleError(
        res,
        "Search query is required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    if (products.length === 0) {
      return handleError(res, "No products found", HTTP_STATUS.NOT_FOUND);
    }

    const returnData = new ReturnData();
    returnData.success = true;
    returnData.message = "Products found";
    returnData.data = products;
    res.status(HTTP_STATUS.OK).json(returnData.toObject());
  } catch (error) {
    handleError(res, error);
  }
};
