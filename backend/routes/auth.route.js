import { Router } from "express"
import {
  signIn,
  signInAdmin,
  signUp,
  sendOTP,
  verifyOTP,
} from "../controllers/auth.controller.js"

const authRouter = Router()
authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)
authRouter.post("/admin/sign-in", signInAdmin)
authRouter.post("/send-otp", sendOTP)
authRouter.post("/verify-otp", verifyOTP)

export default authRouter
