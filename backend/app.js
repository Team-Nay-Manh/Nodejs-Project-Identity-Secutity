import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import { CLIENT_URL, PORT } from "./config/env.js"
import connectToDatabase from "./databases/mongodb.js"
import errormiddlewares from "./middlewares/error.middlewares.js"
import { loginLimiter, registerLimiter } from "./middlewares/rateLimiter.js"
import authRouter from "./routes/auth.route.js"
import cartRouter from "./routes/cart.route.js"
import categoryRouter from "./routes/category.route.js"
import orderRouter from "./routes/order.route.js"
import productRouter from "./routes/product.route.js"
import userRouter from "./routes/user.route.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))

// Áp dụng rate limiting cho route đăng nhập trước khi định nghĩa route
app.use("/api/v1/auth/sign-in", loginLimiter)
app.use("/api/v1/auth/sign-up", registerLimiter)

// Định nghĩa các route
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/categories", categoryRouter)

app.use(errormiddlewares)

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  await connectToDatabase()
})

export default app
