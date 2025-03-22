import Product from "../models/product.model.js";
import ReturnData from "../models/returnData.model.js";

export const getProducts = async (req, res, next) => {
  let returnData = new ReturnData();

  try {
    returnData.data = await Product.find();
    returnData.success = true;
    returnData.message = "Get products successfully";
  } catch (error) {
    returnData.message = "Failed to fetch products";
  }

  res.send(returnData.toObject());
};

export const getProduct = async (req, res, next) => {
  let returnData = new ReturnData();

  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      returnData.message = "Product not found";
      return res.status(404).send(returnData.toObject());
    }

    returnData.success = true;
    returnData.message = "Get product successfully";
    returnData.data = { product };

    res.send(returnData.toObject());
  } catch (error) {
    returnData.message = "Failed to retrieve product";
    res.status(500).send(returnData.toObject());
  }
};

export const addProduct = async (req, res, next) => {
  let returnData = new ReturnData();

  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || !price || stock === undefined) {
      returnData.message = "Name, price, and stock are required";
      return res.status(400).send(returnData.toObject());
    }

    const imageUrl = req.files.imageUrl ? req.files.imageUrl[0].path : null;
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

    returnData.success = true;
    returnData.message = "Product created successfully";
    returnData.data = newProduct;

    res.status(201).send(returnData.toObject());
  } catch (error) {
    returnData.message = "Failed to create product";
    res.status(500).send(returnData.toObject());
  }
};

export const updateProduct = async (req, res, next) => {
  let returnData = new ReturnData();
  try {
    const { productId } = req.params;
    const { name, description, price, stock, category } = req.body;

    // 1️⃣ Find the existing product
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      returnData.message = "Product not found";
      return res.status(404).send(returnData.toObject());
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

    returnData.success = true;
    returnData.message = "Product updated successfully";
    returnData.data = product;
    res.send(returnData.toObject());
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  let returnData = new ReturnData();
  try {
    const { productId } = req.params;

    // 1️⃣ Find the product
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      returnData.message = "Product not found";
      return res.status(404).send(returnData.toObject());
    }

    // 2️⃣ Delete the product
    await Product.deleteOne({ _id: productId });

    returnData.success = true;
    returnData.message = "Product deleted successfully";
    res.json(returnData.toObject());
  } catch (error) {
    next(error);
  }
};

export const searchProduct = async (req, res, next) => {
  let returnData = new ReturnData();
  try {
    const { query } = req.query; // Get search query from URL
    console.log("Search Query:", req.query.query);

    if (!query) {
      returnData.message = "Search query is required";
      return res.status(400).send(returnData.toObject());
    }

    // 1️⃣ Find products that match name, category, or description
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    if (products.length === 0) {
      returnData.message = "No products found";
      return res.status(404).send(returnData.toObject());
    }
    returnData.success = true;
    returnData.message = "Products found";
    returnData.data = { products };
    res.send(returnData.toObject());
  } catch (error) {
    next(error);
  }
};
