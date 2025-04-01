import { Router } from "express"
import { signIn, signInAdmin, signUp } from "../controllers/auth.controller.js"

const authRouter = Router()
authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)
authRouter.post("/admin/sign-in", signInAdmin)

export default authRouter
