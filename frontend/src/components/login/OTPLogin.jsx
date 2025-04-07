import { useState } from "react"
import styles from "./LoginPopup.module.scss"
import classNames from "classnames/bind"
import { sendOTP, verifyOTP } from "../../services/authService"
import toast from "react-hot-toast"
import useAuthStore from "../../utils/authStore"
import { useNavigate } from "react-router-dom"

const cx = classNames.bind(styles)

function OTPLogin({ setShowLogin, email }) {
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setCurrentUser } = useAuthStore()
  const navigate = useNavigate()

  console.log(email)

  const handleSendOTP = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter email")
      return
    }

    setIsLoading(true)
    try {
      await sendOTP(email)
      toast.success("OTP was sent to your email")
      setOtpSent(true)
    } catch (error) {
      toast.error(error.message || "Cannot send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    if (!otp) {
      toast.error("Please enter OTP")
      return
    }

    setIsLoading(true)
    try {
      const response = await verifyOTP(email, otp)
      toast.success("Login successfully!!!")
      setCurrentUser(response.data.user)
      setShowLogin(false)
      navigate("/")
    } catch (error) {
      toast.error(error.message || "OTP verification failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cx("login")}>
      <div className={cx("login-container")}>
        <div className={cx("login-container-title")}>
          <h2>Xác thực OTP</h2>
        </div>

        <form
          onSubmit={handleVerifyOTP}
          className={cx("login-container-inputs")}
        >
          <input
            type='text'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder='Nhập mã OTP'
            required
          />
          <button type='submit' disabled={isLoading}>
            {isLoading ? "Đang xác thực..." : "Xác thực OTP"}
          </button>
          <div className={cx("login-container-popup")}>
            <p>
              Không nhận được mã? <span onClick={handleSendOTP}>Gửi lại</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OTPLogin
