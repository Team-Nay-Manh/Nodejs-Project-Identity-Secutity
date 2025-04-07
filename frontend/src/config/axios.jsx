import toast from "react-hot-toast"
import CountdownToast from "../components/CountdownToast"
import apiRequest from "./axios"

// Tạo một wrapper component để sử dụng toast
export const AxiosInterceptor = ({ children }) => {
  apiRequest.interceptors.response.use(
    (response) => response,
    (error) => {
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

  return children
}
