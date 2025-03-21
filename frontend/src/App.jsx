import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/footer/Footer"
import { useEffect, useState } from "react"
import LoginPopup from "./components/login/LoginPopup"
import ScrollToTop from "./components/srollToTop/ScrollToTop"

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showButtonScrollToTop, setShowButtonScrollToTop] = useState(false)

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = "hidden" // Vô hiệu hóa cuộn
    } else {
      document.body.style.overflow = "auto" // Kích hoạt lại cuộn
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [showLogin])

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setShowButtonScrollToTop(true)
    } else {
      setShowButtonScrollToTop(false)
    }
  }

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
      {showButtonScrollToTop && <ScrollToTop />}
    </>
  )
}

export default App
