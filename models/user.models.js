import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "User name is required"],
      trim: true,
      minLength: 5,
      maxLength: 255
    },
    email: {
      type: String,
      require: [true, "User email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill valid email address"]
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: 6
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User
