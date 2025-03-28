import Category from "../models/category.model.js"
import ReturnData from "../models/returnData.model.js"
import HTTP_STATUS from "../config/http-status.js"
import handleError from "../config/error-handler.js"

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()

    if (categories.length === 0) {
      return handleError(res, "No categories found", HTTP_STATUS.NOT_FOUND)
    }

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Get categories successfully"
    returnData.data = categories

    res.status(HTTP_STATUS.OK).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}

export const getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
      return handleError(res, "Category not found", HTTP_STATUS.NOT_FOUND)
    }

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Get category successfully"
    returnData.data = category

    res.status(HTTP_STATUS.OK).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}

export const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body
    if (!name) {
      return handleError(res, "Name is required", HTTP_STATUS.BAD_REQUEST)
    }
    const image = req.file ? req.file.path : null
    const newCategory = await Category.create({
      name,
      image,
    })

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Category created successfully"
    returnData.data = newCategory

    res.status(HTTP_STATUS.CREATED).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const { name } = req.body

    const category = await Category.findOne({ _id: categoryId })
    if (!category) {
      return handleError(res, "Category not found", HTTP_STATUS.NOT_FOUND)
    }

    category.name = name || category.name
    category.image = req.file ? req.file.path : category.image

    await category.save()

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Category updated successfully"
    returnData.data = category

    res.status(HTTP_STATUS.OK).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}

export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
      return handleError(res, "Category not found", HTTP_STATUS.NOT_FOUND)
    }

    await Category.deleteOne({ _id: categoryId })

    const returnData = new ReturnData()
    returnData.success = true
    returnData.message = "Category deleted successfully"

    res.status(HTTP_STATUS.OK).json(returnData.toObject())
  } catch (error) {
    handleError(res, error)
  }
}
