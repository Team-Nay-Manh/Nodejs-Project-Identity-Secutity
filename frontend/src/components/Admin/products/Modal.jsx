import React, { useEffect } from "react"
import PropTypes from "prop-types"
import "./product.css"

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscapePress = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscapePress)

    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscapePress)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const handleContentClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal
