import apiRequest from "../config/axios"

export const getUsers = async () => {
  try {
    const res = await apiRequest.get("/api/v1/users")

    if (!res.data) {
      throw new Error("No data received from API")
    }

    const users = res.data.data || []

    return users
  } catch (error) {
    throw new Error(error.mesage || "Failed!!!")
  }
}

export const toggleUserRole = async (userId) => {
  try {
    const res = await apiRequest.put(`/api/v1/users/${userId}/role`)
    if (!res.data?.success) {
      throw new Error(res.data?.message || "Failed to update user role")
    }
    return res.data.data
  } catch (error) {
    throw new Error(error.reponse.data || "Failed!!!")
  }
}
