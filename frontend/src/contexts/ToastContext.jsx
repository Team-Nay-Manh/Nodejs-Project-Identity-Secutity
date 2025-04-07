import React, { createContext, useContext, useState } from "react"
import Toast from "../components/Toast"

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info"
  })

  const showToast = (message, severity = "info") => {
    setToast({ open: true, message, severity })
  }

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
