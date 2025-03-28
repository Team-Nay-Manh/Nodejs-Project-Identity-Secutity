import Cookies from "js-cookie"

const checkTokenValidity = () => {
  const token = Cookies.get("token_identity")
  if (!token) return false

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1])) // Decode token payload
    return exp * 1000 > Date.now() // Kiểm tra thời gian hết hạn
  } catch (error) {
    throw new Error(error.message)
  }
}
export default checkTokenValidity
