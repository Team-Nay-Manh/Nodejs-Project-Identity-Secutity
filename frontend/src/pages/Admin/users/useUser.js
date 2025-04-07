import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { getUsers, toggleUserRole } from "../../../services/userService"

export function useUser() {
  const queryClient = useQueryClient()

  const {
    data: users = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    onError: (error) => {
      toast.error(error?.message || "Failed to fetch users")
    }
  })

  const { mutate: toggleRole, isLoading: isToggling } = useMutation({
    mutationFn: toggleUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("Change user role success!!")
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update user role")
    }
  })

  // Ensure users is an array and log the filtered results

  const regularUsers = users.filter((user) => user?.role === "user")
  const adminUsers = users.filter((user) => user?.role === "admin")

  console.log("Filtered Users:", { regularUsers, adminUsers })

  return {
    regularUsers,
    adminUsers,
    isLoading,
    error,
    toggleRole,
    isToggling
  }
}
