import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import upload from "../multer/handle-upload.js";

const productRouter = Router();
productRouter.get("/", getProducts);
productRouter.get("/:productId", getProduct);
productRouter.post(
  "/add",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "detailImages", maxCount: 10 },
  ]),
  addProduct
);
productRouter.put(
  "/:productId",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "detailImages", maxCount: 10 },
  ]),
  updateProduct
);
productRouter.delete("/:productId", deleteProduct);
export default productRouter;
