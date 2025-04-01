import apiRequest from "../config/axios"

export const fetchCart = async (userId) => {
  try {
    const response = await apiRequest.get(`/api/v1/cart/${userId}`)
    if (response.data && response.data.success && response.data.data) {
      return response.data.data.products || []
    }
    return []
  } catch (error) {
    console.error("Error fetching cart:", error)
    return []
  }
}

export const createEmptyCart = async (userId) => {
  try {
    const response = await apiRequest.post(`/api/v1/cart`, {
      userId,
    })
    return response.data
  } catch (error) {
    console.error("Error creating empty cart:", error)
    return { success: false }
  }
}

export const addProduct = async (userId, productId, quantity = 1) => {
  try {
    const response = await apiRequest.post(`/api/v1/cart/${userId}/products`, {
      userId,
      productId,
      quantity,
    })
    return response.data
  } catch (error) {
    console.error("Error adding to cart:", error)
    throw error
  }
}

export const updateQuantity = async (userId, productId, quantity) => {
  try {
    const response = await apiRequest.put(
      `/api/v1/cart/${userId}/products/${productId}`,
      {
        userId,
        productId,
        quantity,
      }
    )
    return response.data
  } catch (error) {
    console.error("Error updating cart quantity:", error)
    throw error
  }
}

export const removeProduct = async (userId, productId) => {
  try {
    const response = await apiRequest.delete(
      `/api/v1/cart/${userId}/products/${productId}`,
      {
        data: {
          userId,
          productId,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("Error removing from cart:", error)
    throw error
  }
}

export const clearCart = async (userId) => {
  try {
    const response = await apiRequest.delete(`/api/v1/cart/${userId}`, {
      data: { userId },
    })
    return response.data
  } catch (error) {
    console.error("Error clearing cart:", error)
    throw error
  }
}
