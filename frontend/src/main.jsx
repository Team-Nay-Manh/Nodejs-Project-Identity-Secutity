import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import GlobalStyled from "./GlobalStyled/GlobalStyled.jsx"
import { StoreContextProvider } from "./context/StoreContext.jsx"
import { Route, Routes } from "react-router-dom"
import Cart from "./pages/User/Cart/Cart"
import Home from "./pages/User/Home/Home"
import Login from "./pages/User/Login/Login"
import PlaceOrder from "./pages/User/PlaceOrder/PlaceOrder"
import UserLayout from "./pages/User/UserLayout"
import AdminLayout from "./pages/Admin/AdminLayout"
import { default as HomeAdmin } from "./pages/Admin/home/Home"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContextProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyled>
          <BrowserRouter>
            <>
              <div>
                <Routes>
                  <Route element={<UserLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<PlaceOrder />} />
                  </Route>
                  <Route element={<AdminLayout />}>
                    <Route path='/admin/home' element={<HomeAdmin />} />
                    <Route path='/admin/users' />
                    <Route path='/admin/orders' />
                    <Route path='/admin/products' />
                  </Route>
                  <Route path='/login' element={<Login />} />
                </Routes>
              </div>
            </>
          </BrowserRouter>
          <Toaster
            position='top-center'
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000
              },
              error: {
                duration: 5000
              },
              style: {
                fontSize: "16px",
                maxWidth: " 500px",
                padding: "24px 16px",
                backgroundcolor: "var(--color-grey-0)",
                color: "var(--color-grey-700)"
              }
            }}
          />
        </GlobalStyled>
      </QueryClientProvider>
    </StoreContextProvider>
  </React.StrictMode>
)
