import { Router } from "express"
import {
  getUser,
  getUsers,
  toggleUserRole
} from "../controllers/user.controller.js"
import { authorize } from "../middlewares/auth.middlewares.js"

const userRouter = Router()

userRouter.get("/", authorize, getUsers)
userRouter.get("/:id", authorize, getUser)
userRouter.put("/:id", (req, res) => {
  return res.send({ title: "Update user" })
})
userRouter.delete("/:id", (req, res) => {
  return res.send({ title: "Delete user" })
})
userRouter.put("/:id/role", authorize, toggleUserRole)

export default userRouter
