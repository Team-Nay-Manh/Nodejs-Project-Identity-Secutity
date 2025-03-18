import Product from "../models/product.model.js"

export const getProducts = async (req, res, next) => {
  try {
    const products = Product.find()

    res.status(200).json({
      success: true,
      message: "Get products successfully",
      data: { products }
    })
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.body
    const product = Product.findOne({ _id: productId })

    res.status(200).json({
      success: true,
      message: "Get product successfully",
      data: { product }
    })
  } catch (error) {
    next(error)
  }
}
