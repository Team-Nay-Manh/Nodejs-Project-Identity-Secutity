import User from "../models/user.models.js"

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
      const error = new Error("User not found")
      error.status = 404
      throw error
    }
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

export const toggleUserRole = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      const error = new Error("User not found")
      error.status = 404
      throw error
    }

    // Toggle role
    user.role = user.role === "user" ? "admin" : "user"
    await user.save()

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user
    })
  } catch (error) {
    next(error)
  }
}
