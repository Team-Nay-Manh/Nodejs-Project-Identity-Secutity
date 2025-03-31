import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { fetchCategories, fetchProducts } from "../services/productService"

export const StoreContext = createContext()

export const StoreContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({})
  const [showLogin, setShowLogin] = useState(false)
  const [food_list, setFoodList] = useState([]) // Store products here
  const [categories, setCategories] = useState([]) // Store categories here

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

  const addToCart = (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((pre) => ({ ...pre, [itemId]: 1 }))
    } else {
      setCartItem((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }))
    }
  }

  const removeFromCart = (itemId) => {
    setCartItem((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }))
  }

  const getTotalAmount = () => {
    let totalAmount = 0

    for (const itemId in cartItem) {
      console.log(cartItem[itemId])

      if (cartItem[itemId] > 0) {
        let itemInfo = food_list.find((food) => food._id === parseInt(itemId))
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[itemId]
        }
      }
    }
    console.log(totalAmount)
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

  const btnPay = () => {
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        setCartItem((pre) => ({ ...pre, [item]: 0 }))
      }
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
