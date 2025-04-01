import { Navigate } from "react-router-dom"
import useAuthStore from "../../utils/authStore"

function ProtectedRouteAdmin({ children }) {
  const { currentUser } = useAuthStore()

  return currentUser?.role === "admin" ? (
    children
  ) : (
    <Navigate to='/admin/login' />
  )
}

export default ProtectedRouteAdmin
