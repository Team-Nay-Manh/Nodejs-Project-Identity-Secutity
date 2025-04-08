import apiRequest from "../config/axios"

const API_URL = import.meta.env.VITE_API_ENDPOINT

/**
 * Fetch all orders for the current user
 */
export const getUserOrders = async () => {
  try {
    const response = await apiRequest.get(`${API_URL}/api/v1/order`)

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch orders")
    }

    return response.data
  } catch (error) {
    console.error("Error fetching user orders:", error)
    throw error
  }
}

/**
 * Fetch a single order by ID
 * @param {string} orderId - The ID of the order to fetch
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await apiRequest.get(`${API_URL}/api/v1/order/${orderId}`)

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch order details")
    }

    return response.data
  } catch (error) {
    console.error("Error fetching order details:", error)
    throw error
  }
}

export const updateStatus = async (data) => {
  try {
    const response = await apiRequest.put(
      `/api/v1/order/${data.orderId}/status`,
      data
    )

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch order details")
    }

    return response.data
  } catch (error) {
    console.error("Error fetching order details:", error)
    throw error
  }
}
