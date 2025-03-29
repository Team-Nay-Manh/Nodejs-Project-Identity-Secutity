import express from "express"
import { CLIENT_URL, PORT } from "./config/env.js"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import connectToDatabase from "./databases/mongodb.js"
import errormiddlewares from "./middlewares/error.middlewares.js"
import cookieParser from "cookie-parser"
import cartRouter from "./routes/cart.route.js"
import productRouter from "./routes/product.route.js"
import orderRouter from "./routes/order.route.js"
import categoryRouter from "./routes/category.route.js"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))

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
