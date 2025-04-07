import { Route, Routes } from "react-router-dom"
import Cart from "./pages/User/Cart/Cart"
import Home from "./pages/User/Home/Home"
import Login from "./pages/User/Login/Login"
import PlaceOrder from "./pages/User/PlaceOrder/PlaceOrder"
import UserLayout from "./pages/User/UserLayout"
import AdminLayout from "./pages/Admin/AdminLayout"
import { default as HomeAdmin } from "./pages/Admin/home/Home"
import OrderPage from "./pages/Admin/orders/OrderPage"
import OrderDetailsPage from "./pages/Admin/orders/OrderPage"
import ProductPage from "./pages/Admin/products/ProductPage"

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin/home" element={<HomeAdmin />} />
            <Route path="/admin/users" />
            <Route path="/admin/orders" element={<OrderPage />} />
            <Route
              path="/admin/Orders/:orderId"
              element={<OrderDetailsPage />}
            />
            <Route path="/admin/products" element={<ProductPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
