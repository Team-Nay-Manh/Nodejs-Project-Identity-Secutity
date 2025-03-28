import { Router } from "express"
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js"
import upload from "../multer/handle-upload-img.js"

const categoryRouter = Router()

// Create a new category
categoryRouter.post("/add", upload.single("image"), addCategory)

// Get all categories
categoryRouter.get("/", getCategories)

// Get a single category by ID
categoryRouter.get("/:categoryId", getCategory)

// Update a category by ID
categoryRouter.put("/:categoryId", upload.single("image"), updateCategory)

// Delete a category by ID
categoryRouter.delete("/:categoryId", deleteCategory)

export default categoryRouter
