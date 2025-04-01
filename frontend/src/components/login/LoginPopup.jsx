import { useContext, useState } from "react"
import styles from "./LoginPopup.module.scss"
import classNames from "classnames/bind"
import { useLogin } from "../../pages/User/Login/useLogin"
import { useRegister } from "../../pages/User/Login/useRegister"
import { StoreContext } from "../../context/StoreContext"

const cx = classNames.bind(styles)

function LoginPopup() {
  const [currState, setCurrState] = useState("Login")
  const { login, isLoadingLogin, errorLogin } = useLogin()
  const { register, isLoadingRegister, errorRegister } = useRegister()
  const { setShowLogin } = useContext(StoreContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    console.log(data)
    if (currState === "Login") {
      login(data, {
        onSuccess: () => {
          setShowLogin(false)
        },
      })
    } else {
      register(data)
      setCurrState("Login")
    }
  }

  return (
    <div className={cx("login")}>
      <form onSubmit={handleSubmit} className={cx("login-container")}>
        <div className={cx("login-container-title")}>
          <h2>{currState}</h2>
        </div>
        <div className={cx("login-container-inputs")}>
          {currState !== "Login" && (
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              required
            />
          )}
          <input type="email" name="email" placeholder="Your Email" required />
          <input
            type="password"
            name="password"
            placeholder="Passsword"
            required
          />
        </div>
        {(errorLogin || errorRegister) && (
          <span className={cx("message-error")}>
            {errorLogin?.message || errorRegister?.message}
          </span>
        )}
        <button disabled={isLoadingLogin || isLoadingRegister}>
          {currState === "Sign up" ? "Create account" : "Login"}
        </button>

        <div className={cx("login-container-popup")}>
          {currState === "Login" && (
            <p>
              Create a new account???{" "}
              <span onClick={() => setCurrState("Sign up")}>Click here</span>
            </p>
          )}

          {currState !== "Login" && (
            <p>
              Alrealy have a account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPopup
