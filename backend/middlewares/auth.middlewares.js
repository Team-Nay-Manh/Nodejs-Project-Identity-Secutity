import { JWT_SECRET } from "../config/env.js"
import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

export const authorize = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" })
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId)
    if (!user) return res.status(401).json({ message: "Unauthorized" })

    req.user = user

    next()
  } catch (error) {
    res.status(404).json({ message: "Unanuthorized", error: error.message })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    })
  }
}
