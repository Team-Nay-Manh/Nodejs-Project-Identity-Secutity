import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { register as registerService } from "../../../services/authService"
import { createEmptyCart } from "../../../services/cartService"

export function useRegister() {
  const navigate = useNavigate()

  const {
    mutate: register,
    isLoading: isLoadingRegister,
    error: errorRegister,
  } = useMutation({
    mutationFn: (credentials) => registerService(credentials),
    onSuccess: async (data) => {
      try {
        if (data.data && data.data.user && data.data.user._id) {
          await createEmptyCart(data.data.user._id)
        }
        toast.success("Register successfully!!!")
        navigate("/login")
      } catch (error) {
        console.error("Error during post-registration:", error)
        navigate("/login")
      }
    },
    onError: (error) => toast.error(error?.message || "Register failed!!!"),
  })

  return { register, isLoadingRegister, errorRegister }
}
