import { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import ScrollToTop from "../../components/srollToTop/ScrollToTop"
import { StoreContext } from "../../context/StoreContext"

function UserLayout() {
  const [showButtonScrollToTop, setShowButtonScrollToTop] = useState(false)
  const { showLogin, setShowLogin } = useContext(StoreContext)

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
    <div className="app">
      <Navbar />
      <Outlet />
      {showButtonScrollToTop && <ScrollToTop />}
      {showLogin && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <LoginPopup />
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              color: "white",
              fontSize: "24px",
            }}
            onClick={() => setShowLogin(false)}
          >
            ✕
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default UserLayout
