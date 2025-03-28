import apiRequest from "../config/axios"

export const login = async (crendentials) => {
  try {
    const res = await apiRequest.post("/api/v1/auth/sign-in", crendentials)
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

export const logout = async () => {
  try {
    const res = await apiRequest.post("/api/v1/auth/logout")
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
}
