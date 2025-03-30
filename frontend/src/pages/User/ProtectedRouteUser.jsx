import { Navigate } from "react-router-dom"
import useAuthStore from "../../utils/authStore"

function ProtectedRouteUser({ children }) {
  const { currentUser } = useAuthStore()

  return currentUser ? children : <Navigate to='/login' />
}

export default ProtectedRouteUser
