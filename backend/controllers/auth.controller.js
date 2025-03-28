import mongoose from "mongoose"
import User from "../models/user.models.js"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

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
      { username, email, password: hasedPassword }
    ])

    const token = jwt.sign({ userId: newUser[0].id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    })

    await session.commitTransaction()
    session.endSession()

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUser[0] }
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

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    })

    res.status(200).json({
      success: true,
      message: "User signed successfully",
      data: { token, user }
    })
  } catch (error) {
    next(error)
  }
}


