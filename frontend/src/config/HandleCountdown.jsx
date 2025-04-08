import Cookies from "js-cookie"
import toast from "react-hot-toast"
import CountdownToast from "../components/countdown/CountdownToast"
import apiRequest from "./axios"

// Xử lý response
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi 401 (unauthorized)
    if (error.response?.status === 401) {
      Cookies.remove("token_identity")
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login"
      }
    }

    // Xử lý lỗi 429 (rate limit)
    if (error.response?.status === 429) {
      const retryAfter = error.response.data.retryAfter * 60 // Chuyển đổi phút thành giây
      toast.custom(
        () => (
          <div
            style={{
              background: "#ff4d4f",
              color: "white",
              padding: "16px",
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              minWidth: "300px"
            }}
          >
            <div>{error.response.data.message}</div>
            <CountdownToast duration={retryAfter} />
          </div>
        ),
        {
          duration: retryAfter * 1000,
          position: "top-center"
        }
      )
    }
    return Promise.reject(error)
  }
)

// Component wrapper để sử dụng trong React
export const AxiosInterceptor = ({ children }) => {
  return children
}
