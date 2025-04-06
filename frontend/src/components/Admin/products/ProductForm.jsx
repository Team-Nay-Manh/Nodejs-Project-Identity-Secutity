import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { fetchCategories } from "../../../services/productService"
import "./product.css"

const ProductForm = ({
  product = {},
  onSubmit,
  onCancel,
  formType = "add",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  })
  const [preview, setPreview] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to load categories:", error)
      }
    }

    loadCategories()

    if (product && Object.keys(product).length > 0 && formType === "edit") {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category?._id || "",
        image: null,
      })

      if (product.image) {
        setPreview(product.image)
      }
    }
  }, [product, formType])

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "image" && files && files[0]) {
      setFormData({
        ...formData,
        image: files[0],
      })

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(files[0])
    } else if (name === "price") {
      const regex = /^\d*\.?\d*$/
      if (value === "" || regex.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!formData.price) {
      newErrors.price = "Price is required"
    } else if (
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (formType === "add" && !formData.image && !preview) {
      newErrors.image = "Product image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      await onSubmit({
        ...formData,
        price: parseFloat(formData.price),
      })
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="product-form-container">
      <h2>{formType === "add" ? "Add New Product" : "Edit Product"}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₫) *</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? "error" : ""}
          />
          {errors.price && <div className="error-message">{errors.price}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? "error" : ""}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <div className="error-message">{errors.category}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image">
            Product Image {formType === "add" && "*"}
          </label>
          <div className="image-upload-container">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className={errors.image ? "error" : ""}
            />

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Product preview" />
              </div>
            )}
          </div>
          {errors.image && <div className="error-message">{errors.image}</div>}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="loading-spinner-small"></span>
            ) : formType === "add" ? (
              "Add Product"
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

ProductForm.propTypes = {
  product: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(["add", "edit"]),
}

export default ProductForm
