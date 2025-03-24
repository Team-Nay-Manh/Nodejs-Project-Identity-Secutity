import LoginPopup from "../../../components/login/LoginPopup"
import styles from "./Login.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

function Login() {
  return (
    <div className={cx("container")}>
      <LoginPopup />
    </div>
  )
}

export default Login
