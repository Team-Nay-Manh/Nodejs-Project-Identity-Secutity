import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  searchProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import upload from "../multer/handle-upload.js";

const productRouter = Router();
productRouter.get("/search", searchProduct);
productRouter.get("/", getProducts);
productRouter.post(
  "/add",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "detailImages", maxCount: 10 },
  ]),
  addProduct
);
productRouter.get("/:productId", getProduct);

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
