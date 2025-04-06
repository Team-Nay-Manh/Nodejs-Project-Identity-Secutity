import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const ProductTable = ({ products, onDelete, onEdit }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "symbol"
    }).format(price)
  }

  return (
    <div className="product-table-container">
      {products.length === 0 ? (
        <div className="no-products">
          <i className="bx bx-package"></i>
          <p>No products found</p>
        </div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="product-image">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-thumb"
                    />
                  ) : (
                    <div className="no-image">
                      <i className="bx bx-image"></i>
                    </div>
                  )}
                </td>
                <td>
                  <div className="product-name">{product.name}</div>
                  {product.description && (
                    <div className="product-description">
                      {product.description.length > 50
                        ? `${product.description.substring(0, 50)}...`
                        : product.description}
                    </div>
                  )}
                </td>
                <td>{product.category?.name || "No Category"}</td>
                <td className="product-price">{formatPrice(product.price)}</td>
                <td className="product-actions">
                  <button
                    className="edit-btn"
                    title="Edit"
                    onClick={() => onEdit(product)}
                  >
                    <i className="bx bx-edit"></i>
                  </button>
                  <button
                    className="delete-btn"
                    title="Delete"
                    onClick={() => onDelete(product._id)}
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default ProductTable
