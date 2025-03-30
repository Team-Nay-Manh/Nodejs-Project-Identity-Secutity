import apiRequest from "../config/axios"
import Cookies from "js-cookie"

export const login = async (crendentials) => {
  try {
    const res = await apiRequest.post("/api/v1/auth/sign-in", crendentials)
    Cookies.set("token_identity", res.data.data.token, {
      expires: import.meta.env.JWT_EXPIRES_IN,
      secure: true,
      sameSite: "Strict"
    })
    Cookies.set("role", res.data.data.user.role, { expires: 1 })
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
}
export const loginAdmin = async (crendentials) => {
  try {
    const res = await apiRequest.post(
      "/api/v1/auth/admin/sign-in",
      crendentials
    )
    if (res.data.data.user.role !== "admin") {
      throw new Error("Invalid")
    }
    Cookies.set("token_identity", res.data.data.token, {
      expires: import.meta.env.JWT_EXPIRES_IN,
      secure: true,
      sameSite: "Strict"
    })
    Cookies.set("role", res.data.data.user.role, { expires: 1 })
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const register = async (crendentials) => {
  try {
    const res = await apiRequest.post("/api/v1/auth/sign-up", crendentials)
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
}
