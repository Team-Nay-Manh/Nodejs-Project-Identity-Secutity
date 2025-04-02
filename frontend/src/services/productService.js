import apiRequest from "../config/axios"

export const fetchProducts = async () => {
  try {
    const response = await apiRequest.get("/api/v1/products/")
    return response.data.data.products
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export const fetchCategories = async () => {
  try {
    const response = await apiRequest.get("/api/v1/categories/")
    console.log("Fetched categories:", response.data.data)
    return response.data.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

export const searchProducts = async (query) => {
  try {
    const response = await apiRequest.get(
      `/api/v1/products/search?query=${encodeURIComponent(query)}`
    )
    return response.data.data.products
  } catch (error) {
    console.error("Error searching products:", error)
    throw error
  }
}
