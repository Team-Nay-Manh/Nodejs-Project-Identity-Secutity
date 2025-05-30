import mongoose, { Schema } from "mongoose"

const CartSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true, min: 1 }
      }
    ]
  },
  { timestamps: true }
)

CartSchema.index({ userId: 1 });

const Cart = mongoose.model("Cart", CartSchema)
export default Cart
