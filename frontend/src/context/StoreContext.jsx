import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { fetchCategories, fetchProducts } from "../services/productService"
import useAuthStore from "../utils/authStore"
import {
  addProduct,
  fetchCart,
  removeProduct,
  updateQuantity,
  clearCart,
} from "../services/cartService"
import toast from "react-hot-toast"

export const StoreContext = createContext()

export const StoreContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({})
  const [showLogin, setShowLogin] = useState(false)
  const [food_list, setFoodList] = useState([])
  const [categories, setCategories] = useState([])
  const { currentUser } = useAuthStore()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const products = await fetchProducts()
        setFoodList(products)

        const categoriesData = await fetchCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Failed to load initial data:", error)
      }
    }
    loadInitialData()
  }, [])

  useEffect(() => {
    const loadUserCart = async () => {
      if (currentUser && currentUser._id) {
        try {
          const cartProducts = await fetchCart(currentUser._id)
          const cartMap = {}

          if (Array.isArray(cartProducts)) {
            cartProducts.forEach((item) => {
              if (item.productId) {
                const productId =
                  typeof item.productId === "string"
                    ? item.productId
                    : item.productId._id
                cartMap[productId] = item.quantity
              }
            })
          }

          setCartItem(cartMap)
        } catch (error) {
          console.error("Failed to load user cart:", error)
        }
      }
    }

    loadUserCart()
  }, [currentUser])

  const addToCart = async (itemId) => {
    if (!currentUser) {
      setShowLogin(true)
      return
    }

    try {
      if (!cartItem[itemId]) {
        await addProduct(currentUser._id, itemId, 1)
        setCartItem((pre) => ({ ...pre, [itemId]: 1 }))
      } else {
        const newQuantity = cartItem[itemId] + 1
        await addProduct(currentUser._id, itemId, 1)
        setCartItem((pre) => ({ ...pre, [itemId]: newQuantity }))
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error)
    }
  }

  const removeFromCart = async (itemId) => {
    if (!currentUser) {
      setShowLogin(true)
      return
    }

    try {
      if (cartItem[itemId] === 1) {
        await removeProduct(currentUser._id, itemId)
        setCartItem((pre) => {
          const newCart = { ...pre }
          delete newCart[itemId]
          return newCart
        })
      } else if (cartItem[itemId] > 1) {
        await updateQuantity(currentUser._id, itemId, cartItem[itemId] - 1)
        setCartItem((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }))
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
    }
  }

  const getTotalAmount = () => {
    let totalAmount = 0

    for (const itemId in cartItem) {
      if (cartItem[itemId] > 0) {
        let itemInfo = food_list.find((food) => food._id === itemId)
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[itemId]
        }
      }
    }
    return totalAmount
  }

  const getItemFromCart = () => {
    let totalItem = 0
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += 1
      }
    }
    return totalItem
  }

  const btnPay = async () => {
    if (!currentUser) {
      setShowLogin(true)
      return
    }

    try {
      const response = await clearCart(currentUser._id)

      if (response.success) {
        setCartItem({})
        toast.success("Payment successful!")
      }
    } catch (error) {
      console.error("Failed to process payment:", error)
      toast.error("Payment failed. Please try again.")
    }
  }

  const contextValue = {
    food_list,
    categories,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalAmount,
    getItemFromCart,
    btnPay,
    showLogin,
    setShowLogin,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
