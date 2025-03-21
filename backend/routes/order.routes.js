import { Router } from "express"

const orderRouter = Router()
orderRouter.get("/:userId", (req, res) => {
  res.send("Your order")
})

export default orderRouter
