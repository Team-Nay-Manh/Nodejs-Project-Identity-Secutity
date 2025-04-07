import { useMutation } from "@tanstack/react-query"
import { login as loginService } from "../../../services/authService"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import useAuthStore from "../../../utils/authStore"

export function useVerify() {
  const navigate = useNavigate()
  const { setCurrentUser } = useAuthStore()
  const {
    mutate: verifyMutation,
    isLoading: isLoadingVerify,
    error: errorVerify
  } = useMutation({
    mutationFn: (credentials) => loginService(credentials),
    onSuccess: (data) => {
      toast.success("Login successfully!!!")
      setCurrentUser(data.data.user)
      navigate("/verifyEmail")
    },
    onError: () => toast.error("Login failed!!!")
  })

  return { verifyMutation, isLoadingVerify, errorVerify }
}
