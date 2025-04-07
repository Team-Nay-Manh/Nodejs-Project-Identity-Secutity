import { useState } from "react"
import styles from "./LoginPopup.module.scss"
import classNames from "classnames/bind"
import { sendOTP, verifyOTP } from "../../services/authService"
import toast from "react-hot-toast"
import useAuthStore from "../../utils/authStore"
import { useNavigate } from "react-router-dom"

const cx = classNames.bind(styles)

function OTPLogin({ setShowLogin }) {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setCurrentUser } = useAuthStore()
  const navigate = useNavigate()

  const handleSendOTP = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Vui lòng nhập email")
      return
    }

    setIsLoading(true)
    try {
      await sendOTP(email)
      toast.success("Mã OTP đã được gửi đến email của bạn")
      setOtpSent(true)
    } catch (error) {
      toast.error(error.message || "Không thể gửi OTP. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    if (!otp) {
      toast.error("Vui lòng nhập mã OTP")
      return
    }

    setIsLoading(true)
    try {
      const response = await verifyOTP(email, otp)
      toast.success("Đăng nhập thành công!")
      setCurrentUser(response.data.user)
      setShowLogin(false)
      navigate("/")
    } catch (error) {
      toast.error(error.message || "Mã OTP không đúng. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cx("login")}>
      <div className={cx("login-container")}>
        <div className={cx("login-container-title")}>
          <h2>Đăng nhập bằng OTP</h2>
        </div>

        {!otpSent ? (
          <form
            onSubmit={handleSendOTP}
            className={cx("login-container-inputs")}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleVerifyOTP}
            className={cx("login-container-inputs")}
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Nhập mã OTP"
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Đang xác thực..." : "Xác thực OTP"}
            </button>
            <div className={cx("login-container-popup")}>
              <p>
                Không nhận được mã? <span onClick={handleSendOTP}>Gửi lại</span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default OTPLogin
