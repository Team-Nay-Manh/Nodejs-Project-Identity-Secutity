import { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import ScrollToTop from "../../components/srollToTop/ScrollToTop"
import { StoreContext } from "../../context/StoreContext"

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
