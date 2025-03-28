import express from "express"
import { PORT } from "./config/env.js"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import connectToDatabase from "./databases/mongodb.js"
import errormiddlewares from "./middlewares/error.middlewares.js"
import cookieParser from "cookie-parser"
import cartRouter from "./routes/cart.routes.js"
import productRouter from "./routes/product.routes.js"
import orderRouter from "./routes/order.routes.js"
import categoryRouter from "./routes/category.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/categories", categoryRouter)

app.use(errormiddlewares)

app.listen(PORT, async () => {
  console.log(`Server i running on http://localhost:${PORT}`)
  await connectToDatabase()
})

export default app
