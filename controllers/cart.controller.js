import Cart from "../models/cart.model"
import User from "../models/user.models"

export const getAllProductFromCart = async (req, res, next) => {
  try {
    const { userId } = req.body
    const user = await User.findOne({ _id: userId })
    if (!user) {
      const error = new Error("User not found")
      error.status = 404
      throw error
    }

    const cart = Cart.findOne({ userId })
    if (!cart) {
      const error = new Error("Cart not found")
      error.status = 404
      throw error
    }

    res.status(200).json({
      success: true,
      data: { cart }
    })
  } catch (error) {
    next(error)
  }
}
