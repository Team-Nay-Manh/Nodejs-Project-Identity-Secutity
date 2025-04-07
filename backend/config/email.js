import nodemailer from "nodemailer"
import { EMAIL_USER, EMAIL_PASS } from "./env.js"

// Cấu hình transporter để gửi email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

// Hàm gửi email OTP
export const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Mã xác thực đăng nhập",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Mã xác thực đăng nhập</h2>
          <p>Xin chào,</p>
          <p>Mã OTP của bạn để đăng nhập vào hệ thống là:</p>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>Mã OTP này sẽ hết hạn sau 5 phút.</p>
          <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
          <p>Trân trọng,<br>Đội ngũ hỗ trợ</p>
        </div>
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error) {
    console.error("Lỗi khi gửi email:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
