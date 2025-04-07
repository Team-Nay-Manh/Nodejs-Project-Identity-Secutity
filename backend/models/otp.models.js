import mongoose from "mongoose"

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // OTP tự động hết hạn sau 5 phút (300 giây)
    },
  },
  { timestamps: true }
)

const OTP = mongoose.model("OTP", otpSchema)
export default OTP
