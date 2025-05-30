import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { login as loginService } from "../../../services/authService"
import useAuthStore from "../../../utils/authStore"

export function useLogin() {
  const { setCurrentUser } = useAuthStore()
  const {
    mutate: loginMutation,
    isLoading: isLoadingLogin,
    error: errorLogin
  } = useMutation({
    mutationFn: (credentials) => loginService(credentials),
    onSuccess: (data) => {
      toast.success("Login successfully!!!")
      setCurrentUser(data.data.user)
    },
    onError: () => toast.error("Login failed!!!")
  })

  const login = (credentials, options = {}) => {
    return loginMutation(credentials, {
      onSuccess: (data) => {
        if (options && options.onSuccess) {
          options.onSuccess(data)
        }
      }
    })
  }

  return { login, isLoadingLogin, errorLogin }
}
