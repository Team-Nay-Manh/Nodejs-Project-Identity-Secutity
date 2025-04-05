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

export const fetchProductById = async (productId) => {
  try {
    const response = await apiRequest.get(`/api/v1/products/${productId}`)
    return response.data.data
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error)
    throw error
  }
}

const createProductFormData = (productData) => {
  const formData = new FormData()

  Object.entries(productData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "image" && value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, value)
      }
    }
  })

  return formData
}

export const addProduct = async (productData) => {
  try {
    const formData = createProductFormData(productData)

    const response = await apiRequest.post("/api/v1/products/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    return response.data.data
  } catch (error) {
    console.error("Error adding product:", error)
    throw error
  }
}

export const updateProduct = async (productId, productData) => {
  try {
    const formData = createProductFormData(productData)

    const response = await apiRequest.put(
      `/api/v1/products/${productId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )

    return response.data.data
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error)
    throw error
  }
}

export const deleteProduct = async (productId) => {
  try {
    const response = await apiRequest.delete(`/api/v1/products/${productId}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error)
    throw error
  }
}
