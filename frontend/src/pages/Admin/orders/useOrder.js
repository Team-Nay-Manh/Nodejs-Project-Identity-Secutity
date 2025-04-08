import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateStatus } from "../../../services/orderService"

export function useOrder() {
  const {
    mutate: orderMutation,
    isLoading: isLoadingOrder,
    error
  } = useMutation({
    mutationFn: ({ orderId, status }) => updateStatus({ orderId, status }),
    onSuccess: () => {
      toast.success("Update successfully!!!")
    },
    onError: () => toast.error("Update failed!!!")
  })

  return { orderMutation, isLoadingOrder, error }
}
