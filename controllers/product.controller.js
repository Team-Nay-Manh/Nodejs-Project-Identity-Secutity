import Product from "../models/product.model.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: "Get products successfully",
      data: { products },
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId });

    res.status(200).json({
      success: true,
      message: "Get product successfully",
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || !price || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and stock are required",
      });
    }

    const imageUrl = req.files.imageUrl
      ? req.files.imageUrl[0].path // Cloudinary trả về `path` là URL ảnh
      : null;

    const detailImages = req.files.detailImages
      ? req.files.detailImages.map((file) => file.path)
      : [];

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
      detailImages,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
