import apiRequest from "../config/axios"
import Cookies from "js-cookie"

export const login = async (crendentials, route) => {
  try {
    const res = await apiRequest.post(
      `/api/v1/auth${route ? "/admin" : ""}/sign-in`,
      crendentials
    )
    Cookies.set("token_identity", res.data.data.token, {
      expires: import.meta.env.JWT_EXPIRES_IN,
      secure: true,
      sameSite: "Strict"
    })
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
