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
import { authorize, isAdmin } from "../middlewares/auth.middlewares.js"

const productRouter = Router()
productRouter.get("/search", search)
productRouter.get("/", gets)
productRouter.post("/add", authorize, isAdmin, upload.single("image"), add)
productRouter.get("/:productId", get)

productRouter.put(
  "/:productId",
  authorize,
  isAdmin,
  upload.single("image"),
  update
)
productRouter.delete("/:productId", authorize, isAdmin, remove)
export default productRouter
