import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import { useContext, useEffect, useState } from "react"
import ScrollToTop from "../../components/srollToTop/ScrollToTop"
import LoginPopup from "../../components/login/LoginPopup"
import { StoreContext } from "../../context/StoreContext"
import Footer from "../../components/footer/Footer"

function UserLayout() {
  const [showButtonScrollToTop, setShowButtonScrollToTop] = useState(false)
  const { showLogin } = useContext(StoreContext)

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
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
    <div className='app'>
      <Navbar />
      <Outlet />
      {showButtonScrollToTop && <ScrollToTop />}
      <Footer />
    </div>
  )
}

export default UserLayout
