import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyled from "./GlobalStyled/GlobalStyled.jsx"
import { StoreContextProvider } from "./context/StoreContext.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import LoginAdminPage from "./pages/Admin/login/Login.jsx"
import ProtectedRouteUser from "./pages/User/ProtectedRouteUser.jsx"
import ProtectedRouteAdmin from "./pages/Admin/ProtectedRouteAdmin.jsx"
import PageNotFound from "./pages/pageNotFound/PageNotFound.jsx"
import UserPage from "./pages/Admin/users/UserPage.jsx"
import Home from "./pages/User/Home/Home"
import Cart from "./pages/User/Cart/Cart"
import PlaceOrder from "./pages/User/PlaceOrder/PlaceOrder"
import UserLayout from "./pages/User/UserLayout"
import AdminLayout from "./pages/Admin/AdminLayout"
import { default as HomeAdmin } from "./pages/Admin/home/Home"
import Login from "./pages/User/Login/Login"
import "./index.css"
import OrderPage from "./pages/Admin/orders/OrderPage.jsx"
import OrderDetailsPage from "./pages/Admin/orders/OrderDetailsPage.jsx"
import ProductPage from "./pages/Admin/products/ProductPage.jsx"
import OrderHistory from "./pages/User/OrderHistory/OrderHistory.jsx"
import OrderDetails from "./pages/User/OrderHistory/OrderDetails.jsx"
import { AxiosInterceptor } from "./config/HandleCountdown.jsx"
import VerfiyEmail from "./pages/User/VerifyEmail/VerfiyEmail.jsx"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AxiosInterceptor>
      <DndProvider backend={HTML5Backend}>
        <StoreContextProvider>
          <QueryClientProvider client={queryClient}>
            <GlobalStyled>
              <BrowserRouter>
                <Routes>
                  <Route
                    element={
                      <ProtectedRouteUser>
                        <UserLayout />
                      </ProtectedRouteUser>
                    }
                  >
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<PlaceOrder />} />
                    <Route path='/my-orders' element={<OrderHistory />} />
                    <Route
                      path='/order-details/:orderId'
                      element={<OrderDetails />}
                    />
                  </Route>
                  <Route element={<UserLayout />}>
                    <Route path='/' element={<Home />} />
                  </Route>
                  <Route
                    element={
                      <ProtectedRouteAdmin>
                        <AdminLayout />
                      </ProtectedRouteAdmin>
                    }
                  >
                    <Route path='/admin' element={<HomeAdmin />} />
                    <Route path='/admin/users' element={<UserPage />} />
                    <Route path='/admin/orders' element={<OrderPage />} />
                    <Route path='/admin/orders' element={<OrderPage />} />
                    <Route
                      path='/admin/order-details/:orderId'
                      element={<OrderDetailsPage />}
                    />
                    <Route path='/admin/products' element={<ProductPage />} />
                  </Route>
                  <Route path='/login' element={<Login />} />
                  <Route path='/verifyEmail' element={<VerfiyEmail />} />
                  <Route path='/admin/login' element={<LoginAdminPage />} />
                  <Route path='*' element={<PageNotFound />} />
                </Routes>
              </BrowserRouter>
              <Toaster
                position='top-center'
                toastOptions={{
                  duration: 5000,
                  style: {
                    background: "#ff4d4f",
                    color: "#fff"
                  }
                }}
              />
            </GlobalStyled>
          </QueryClientProvider>
        </StoreContextProvider>
      </DndProvider>
    </AxiosInterceptor>
  </React.StrictMode>
)
