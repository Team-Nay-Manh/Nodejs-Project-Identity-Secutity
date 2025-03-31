import { Router } from "express"
import { getUser, getUsers } from "../controllers/user.controller.js"
import { authorize } from "../middlewares/auth.middlewares.js"

const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.get("/:id", authorize, getUser)

userRouter.put("/:id", (req, res) => {
  return res.send({ title: "Update user" })
})

userRouter.delete("/:id", (req, res) => {
  return res.send({ title: "Delete user" })
})

export default userRouter
