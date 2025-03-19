import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import GlobalStyled from "./GlobalStyled/GlobalStyled.jsx"
import { StoreContextProvider } from "./context/StoreContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContextProvider>
      <GlobalStyled>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalStyled>
    </StoreContextProvider>
  </React.StrictMode>
)
