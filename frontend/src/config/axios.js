import axios from "axios"
import Cookies from "js-cookie"

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true
})

// Thêm token vào headers trước mỗi request
apiRequest.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token_identity")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const userRole = Cookies.get("role")
      Cookies.remove("token")

      if (userRole === "admin") {
        window.location.href = "/admin/login"
      } else {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

export default apiRequest
