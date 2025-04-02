import React, { useState, useEffect } from "react"
import ProductTable from "./ProductTable"
import "./product.css"
import {
  fetchProducts,
  fetchCategories,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/productService"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import Modal from "./Modal"
import ProductForm from "./ProductForm"

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("add")
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(6)
  const [paginatedProducts, setPaginatedProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ])

        setProducts(productsData)
        setCategories(categoriesData)
        setFilteredProducts(productsData)
      } catch (err) {
        console.error("Failed to fetch data:", err)
        setError(err.message)
        toast.error("Unable to load product data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    let result = [...products]

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category._id === selectedCategory
      )
    }

    setFilteredProducts(result)
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, products])

  useEffect(() => {
    const totalItems = filteredProducts.length
    const totalPages = Math.ceil(totalItems / productsPerPage)
    setTotalPages(totalPages)

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    )

    setPaginatedProducts(currentProducts)
  }, [filteredProducts, currentPage, productsPerPage])

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteProduct(productId)
        if (response.success) {
          setProducts(products.filter((product) => product._id !== productId))
          toast.success("Product deleted successfully")
        }
      } catch (error) {
        console.error("Error deleting product:", error)
        toast.error("Unable to delete product. Make sure you have permission.")
      }
    }
  }

  const handleAddProduct = () => {
    setModalMode("add")
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setModalMode("edit")
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === "add") {
        const newProduct = await addProduct(formData)
        setProducts([...products, newProduct])
        toast.success("Product added successfully")
      } else {
        const updatedProduct = await updateProduct(
          selectedProduct._id,
          formData
        )
        setProducts(
          products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        )
        toast.success("Product updated successfully")
      }
      handleCloseModal()
    } catch (error) {
      console.error("Error submitting product:", error)
      toast.error(
        `Unable to ${modalMode} product. Make sure you have permission.`
      )
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pageNumbers = []
    const maxPagesToShow = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    const currentDisplaying = paginatedProducts.length
    const totalItems = filteredProducts.length

    return (
      <div className="pagination">
        <button
          className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="bx bx-chevron-left"></i>
        </button>

        {startPage > 1 && (
          <>
            <button
              className="pagination-button"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-info">...</span>}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pagination-button ${
              currentPage === number ? "active" : ""
            }`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="pagination-info">...</span>
            )}
            <button
              className="pagination-button"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className={`pagination-button ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <i className="bx bx-chevron-right"></i>
        </button>

        <div className="pagination-info">
          Showing {(currentPage - 1) * productsPerPage + 1}-
          {(currentPage - 1) * productsPerPage + currentDisplaying} of{" "}
          {totalItems} products
        </div>
      </div>
    )
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <div className="header-title">
          <i className="bx bx-store-alt"></i>
          <h3>Product Management</h3>
        </div>
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <i className="bx bx-search"></i>
          </div>

          <div className="filter-container">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <i className="bx bx-filter"></i>
          </div>

          <button className="add-product-btn" onClick={handleAddProduct}>
            <i className="bx bx-plus"></i> Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <i className="bx bx-error-circle"></i>
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
          <ProductTable
            products={paginatedProducts}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
          {renderPagination()}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ProductForm
            product={selectedProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
            formType={modalMode}
          />
        </Modal>
      )}
    </div>
  )
}

export default AllProducts
