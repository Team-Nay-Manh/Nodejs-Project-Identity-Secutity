import Product from "../models/product.model.js"
import ReturnData from "../models/returnData.model.js"
import HTTP_STATUS from "../config/http-status.js"
import handleError from "../config/error-handler.js"
import mongoose from "mongoose"

export const getProducts = async (req, res, next) => {
  try {
    let { next_cursor, limit = 10 } = req.query
    limit = parseInt(limit)

    if (limit < 1) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Limit must be a positive number",
      })
    }

    // Điều kiện truy vấn
    const queryCondition = {}
    if (next_cursor) {
      queryCondition._id = { $gt: next_cursor } // Lấy các sản phẩm có _id lớn hơn next_cursor
    }

    // Truy vấn sản phẩm, lấy thêm 1 để xác định next_cursor
    const products = await Product.find(queryCondition)
      .populate("category", "name")
      .sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
      .limit(limit + 1) // Lấy thêm 1 sản phẩm để kiểm tra next_cursor mới

    if (products.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "No products found",
      })
    }

    // Xác định con trỏ mới (next_cursor)
    const hasNextPage = products.length > limit
    const newCursor = hasNextPage ? products[limit]._id : null

    // Cắt danh sách về đúng giới hạn
    if (hasNextPage) {
      products.pop()
    }

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Get products successfully"
    returnData.data = {
      products,
      pagination: {
        next_cursor: newCursor,
        limit,
        hasNextPage,
      },
    }

    res.status(HTTP_STATUS.OK).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}

export const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await Product.findOne({ _id: productId }).populate(
      "category",
      "name"
    )
    if (!product) {
      return handleError(res, "Product not found", HTTP_STATUS.NOT_FOUND)
    }

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Get product successfully"
    returnData.data = product
    res.status(HTTP_STATUS.OK).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body
    if (!name || !price || !category) {
      return handleError(
        res,
        "Name, price, and category are required",
        HTTP_STATUS.BAD_REQUEST
      )
    }
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return handleError(res, "Invalid category ID", HTTP_STATUS.BAD_REQUEST)
    }
    const image = req.file ? req.file.path : null

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      image,
    })

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Product created successfully"
    returnData.data = newProduct
    res.status(HTTP_STATUS.CREATED).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params
    const { name, description, price, category } = req.body

    const product = await Product.findOne({ _id: productId })
    if (!product) {
      return handleError(res, "Product not found", HTTP_STATUS.NOT_FOUND)
    }
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      return handleError(res, "Invalid category ID", HTTP_STATUS.BAD_REQUEST)
    }
    product.name = name || product.name
    product.description = description || product.description
    product.price = price || product.price
    product.category = category || product.category
    if (req.file) {
      product.image = req.file.path
    }
    await product.save()
    await product.populate("category")

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Product updated successfully"
    returnData.data = product
    res.status(HTTP_STATUS.OK).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await Product.findOne({ _id: productId })
    if (!product) {
      return handleError(res, "Product not found", HTTP_STATUS.NOT_FOUND)
    }

    await Product.deleteOne({ _id: productId })

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Product deleted successfully"
    res.status(HTTP_STATUS.OK).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}

export const searchProduct = async (req, res, next) => {
  try {
    let { query, next_cursor, limit = 10 } = req.query

    if (!query) {
      return getProducts(req, res, next)
    }

    limit = +limit
    if (limit < 1) {
      return handleError(
        res,
        "Limit must be a positive number",
        HTTP_STATUS.BAD_REQUEST
      )
    }

    const searchCondition = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }
    if (mongoose.Types.ObjectId.isValid(query)) {
      searchCondition.$or.push({ category: query })
    }
    // Nếu có `next_cursor`, lọc chỉ lấy sản phẩm có `_id > next_cursor`
    if (next_cursor) {
      searchCondition._id = { $gt: next_cursor }
    }

    // Truy vấn với giới hạn `limit + 1` để kiểm tra `next_cursor` mới
    const products = await Product.find(searchCondition)
      .populate("category", "name")
      .sort({ _id: 1 }) // Sắp xếp tăng dần để lấy dữ liệu mới hơn
      .limit(limit + 1) // Lấy thêm 1 sản phẩm để xác định con trỏ tiếp theo

    if (products.length === 0) {
      return handleError(res, "No products found", HTTP_STATUS.NOT_FOUND)
    }

    // Xác định con trỏ mới
    const hasNextPage = products.length > limit
    const newCursor = hasNextPage ? products[limit]._id : null

    // Giới hạn lại số lượng sản phẩm trả về
    if (hasNextPage) {
      products.pop()
    }

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Products found"
    returnData.data = {
      products,
      pagination: {
        next_cursor: newCursor,
        limit,
        hasNextPage,
      },
    }

    res.status(HTTP_STATUS.OK).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}
