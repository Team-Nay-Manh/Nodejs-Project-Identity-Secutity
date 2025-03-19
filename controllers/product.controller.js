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

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, description, price, stock, category } = req.body;

    // 1️⃣ Find the existing product
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 2️⃣ Keep old images unless new ones are uploaded
    const imageUrl = req.files?.imageUrl
      ? req.files.imageUrl[0].path
      : product.imageUrl;

    const detailImages = req.files?.detailImages
      ? [
          ...product.detailImages,
          ...req.files.detailImages.map((file) => file.path),
        ]
      : product.detailImages;

    // 3️⃣ Update product details
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock !== undefined ? stock : product.stock;
    product.category = category || product.category;
    product.imageUrl = imageUrl;
    product.detailImages = detailImages;

    // 4️⃣ Save the updated product
    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // 1️⃣ Find the product
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 2️⃣ Delete the product
    await Product.deleteOne({ _id: productId });

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
