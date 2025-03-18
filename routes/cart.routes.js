import { Router } from "express"
import { getAllProductFromCart } from "../controllers/cart.controller.js"

const cartRouter = Router()
cartRouter.get("/:userId", getAllProductFromCart)

export default cartRouter
