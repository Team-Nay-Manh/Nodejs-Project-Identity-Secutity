import mongoose from "mongoose"
import User from "../models/user.models.js"
import OTP from "../models/otp.models.js"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { sendOTPEmail } from "../config/email.js"

// request body is an object containing data from the client (POST request)
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    //take data from request
    const { username, email, password } = req.body

    // check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const error = new Error("User already exist")
      error.status = 400
      throw error
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create([
      { username, email, password: hasedPassword },
    ])

    const token = jwt.sign(
      { userId: newUser[0].id, role: "user" },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    )

    await session.commitTransaction()
    session.endSession()

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUser[0] },
    })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    next(error)
  }
}

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error("User not found")
      error.status = 404
      throw error
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      const error = new Error("Invalid password")
      error.status = 404
      throw error
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })

    res.status(200).json({
      success: true,
      message: "User signed successfully",
      data: { token, user },
    })
  } catch (error) {
    next(error)
  }
}

export const signInAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error("User not found!!!")
      error.status = 404
      throw error
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      const error = new Error("Invalid password")
      error.status = 404
      throw error
    }

    if (user.role !== "admin") {
      res.status(404).json("Invalid")
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })

    res.status(200).json({
      success: true,
      message: "User signed successfully",
      data: { token, user },
    })
  } catch (error) {
    next(error)
  }
}

// Hàm tạo OTP ngẫu nhiên 6 chữ số
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Gửi OTP đến email
export const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body

    // Kiểm tra xem user có tồn tại không
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error("Email không tồn tại trong hệ thống")
      error.status = 404
      throw error
    }

    // Tạo OTP mới
    const otp = generateOTP()

    // Lưu OTP vào database
    // Xóa OTP cũ nếu có
    await OTP.deleteOne({ email })

    // Tạo OTP mới
    await OTP.create({ email, otp })

    // Gửi OTP qua email
    const emailResult = await sendOTPEmail(email, otp)

    if (!emailResult.success) {
      const error = new Error("Không thể gửi email OTP")
      error.status = 500
      throw error
    }

    res.status(200).json({
      success: true,
      message: "OTP đã được gửi đến email của bạn",
    })
  } catch (error) {
    next(error)
  }
}

// Xác thực OTP và đăng nhập
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body

    // Tìm OTP trong database
    const otpRecord = await OTP.findOne({ email })

    if (!otpRecord) {
      const error = new Error("OTP không tồn tại hoặc đã hết hạn")
      error.status = 400
      throw error
    }

    // Kiểm tra OTP có đúng không
    if (otpRecord.otp !== otp) {
      const error = new Error("OTP không chính xác")
      error.status = 400
      throw error
    }

    // Tìm user theo email
    const user = await User.findOne({ email })

    // Tạo JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })

    // Xóa OTP đã sử dụng
    await OTP.deleteOne({ email })

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      data: { token, user },
    })
  } catch (error) {
    next(error)
  }
}
