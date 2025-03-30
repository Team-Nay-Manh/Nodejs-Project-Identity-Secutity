import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import useAuthStore from "../../../utils/authStore"
import { loginAdmin } from "../../../services/authService"

export function useLogin() {
  const navigate = useNavigate()
  const { setCurrentUser } = useAuthStore()
  const {
    mutate: login,
    isLoading: isLoadingLogin,
    error: errorLogin
  } = useMutation({
    mutationFn: (credentials) => loginAdmin(credentials),
    onSuccess: (data) => {
      console.log(data)
      if (data.data.user.role !== "admin") {
        toast.error("You do not have permission to access admin panel!")
        return
      }
      toast.success("Login successfully!!!")
      setCurrentUser(data.data.user)
      navigate("/admin/home")
    },
    onError: (error) => toast.error(error?.message || "Login failed!!!")
  })

  return { login, isLoadingLogin, errorLogin }
}
