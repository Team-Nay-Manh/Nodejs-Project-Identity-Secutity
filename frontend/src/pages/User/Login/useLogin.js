import { useMutation } from "@tanstack/react-query"
import { login as loginService } from "../../../services/authService"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import useAuthStore from "../../../utils/authStore"

export function useLogin() {
  const navigate = useNavigate()
  const { setCurrentUser } = useAuthStore()
  const {
    mutate: login,
    isLoading: isLoadingLogin,
    error: errorLogin
  } = useMutation({
    mutationFn: (credentials) => loginService(credentials),
    onSuccess: (data) => {
      toast.success("Login successfully!!!")
      console.log(data)
      setCurrentUser(data.data.user)
      navigate("/")
    },
    onError: () => toast.error("Login failed!!!")
  })

  return { login, isLoadingLogin, errorLogin }
}
