import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }, // Reference to Category
    image: { type: String },
  },
  { timestamps: true }
)

const Product = mongoose.model("Product", ProductSchema)

export default Product
