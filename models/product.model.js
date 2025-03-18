import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String },
    imageUrl: { type: String },
    detailImages: [{ type: String }] // Danh sách ảnh chi tiết của sản phẩm
  },
  { timestamps: true }
)

const Product = mongoose.model("Product", ProductSchema)

export default Product
