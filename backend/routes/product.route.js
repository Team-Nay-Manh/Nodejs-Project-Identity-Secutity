import { Router } from "express"

import upload from "../multer/handle-upload-img.js"
import {
  add,
  get,
  gets,
  remove,
  search,
  update,
} from "../controllers/product.controller.js"

const productRouter = Router()
productRouter.get("/search", search)
productRouter.get("/", gets)
productRouter.post("/add", upload.single("image"), add)
productRouter.get("/:productId", get)

productRouter.put("/:productId", upload.single("image"), update)
productRouter.delete("/:productId", remove)
export default productRouter
