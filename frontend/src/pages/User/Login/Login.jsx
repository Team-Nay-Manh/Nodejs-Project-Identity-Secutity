import classNames from "classnames/bind"
import LoginPopup from "../../../components/login/LoginPopup"
import styles from "./Login.module.scss"

const cx = classNames.bind(styles)

function Login() {
  return (
    <div className={cx("container")}>
      <LoginPopup />
    </div>
  )
}

export default Login
