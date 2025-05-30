import mongoose, { Schema } from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending"
    },
    address: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", OrderSchema)
export default Order
