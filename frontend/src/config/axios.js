import axios from "axios"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

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
      const token = Cookies.get("token_identity")
      let userRole = null

      if (token) {
        try {
          const decoded = jwtDecode(token)
          userRole = decoded.role
          console.log(userRole)
        } catch (e) {
          console.error("Invalid token", e)
        }
      }

      Cookies.remove("token_identity")

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
