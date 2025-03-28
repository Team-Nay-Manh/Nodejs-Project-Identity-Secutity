import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { register as registerService } from "../../../services/authService"

export function useRegister() {
  const navigate = useNavigate()

  const {
    mutate: register,
    isLoading: isLoadingRegister,
    error: errorRegister
  } = useMutation({
    mutationFn: (credentials) => registerService(credentials),
    onSuccess: () => {
      toast.success("Register successfully!!!")
      navigate("/login")
    },
    onError: (error) => toast.error(error?.message || "Register failed!!!")
  })

  return { register, isLoadingRegister, errorRegister }
}
