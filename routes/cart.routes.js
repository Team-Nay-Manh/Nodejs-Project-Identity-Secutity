import { Router } from "express"
import { getAllProductFromCart } from "../controllers/cart.controller"

const cartRouter = Router()
authRoute.get("/:userId", getAllProductFromCart)

export default cartRouter
