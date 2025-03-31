import { Router } from "express"
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  searchProduct,
  updateProduct,
} from "../controllers/product.controller.js"
import upload from "../multer/handle-upload-img.js"

const productRouter = Router()
productRouter.get("/search", searchProduct)
productRouter.get("/", getProducts)
productRouter.post("/add", upload.single("image"), addProduct)
productRouter.get("/:productId", getProduct)

productRouter.put("/:productId", upload.single("image"), updateProduct)
productRouter.delete("/:productId", deleteProduct)
export default productRouter
