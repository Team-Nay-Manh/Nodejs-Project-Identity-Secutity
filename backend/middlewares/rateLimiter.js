import rateLimit from "express-rate-limit"

// Cấu hình rate limiting cho đăng nhập
export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 2 phút
  max: 2, // Giới hạn 5 lần đăng nhập trong 5 phút
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const retryAfter = Math.ceil(res.getHeader("Retry-After") / 60)
    res.status(429).json({
      success: false,
      status: 429,
      message: `Quá nhiều lần thử đăng nhập, vui lòng thử lại sau ${retryAfter} phút`,
      retryAfter: retryAfter
    })
  }
})

// Cấu hình rate limiting cho đăng ký
export const registerLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 2 phút
  max: 3, // Giới hạn 3 lần đăng ký trong 2 phút
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const retryAfter = Math.ceil(res.getHeader("Retry-After") / 60)
    res.status(429).json({
      success: false,
      status: 429,
      message: `Quá nhiều lần thử đăng ký, vui lòng thử lại sau ${retryAfter} phút`,
      retryAfter: retryAfter
    })
  }
})
