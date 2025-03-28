import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { logout as logoutService } from "../../../services/authService"
import useAuthStore from "../../../utils/authStore"

export function useLogout() {
  const { removeCurrentUser } = useAuthStore()
  const {
    mutate: logout,
    isLoading: isLoadingLogout,
    error: errorLogout
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      toast.success("Logout successfully!!!")
      removeCurrentUser()
    },
    onError: (error) => toast.error(error?.message || "Logout failed!!!")
  })

  return { logout, isLoadingLogout, errorLogout }
}
