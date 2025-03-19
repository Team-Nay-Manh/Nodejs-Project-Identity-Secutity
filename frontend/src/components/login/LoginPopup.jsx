import { useState } from "react";
import styles from "./LoginPopup.module.scss";
import classNames from "classnames/bind";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function LoginPopup({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign up");
  return (
    <div className={cx("login")}>
      <form action="" className={cx("login-container")}>
        <div className={cx("login-container-title")}>
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className={cx("login-container-inputs")}>
          {currState !== "Login" ? (
            <input type="text" placeholder="Your Name" required />
          ) : (
            <></>
          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Passsword" required />
        </div>
        <button>{currState === "Sign up" ? "Create account" : "Login"}</button>
        <div className={cx("login-container-condition")}>
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>

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
  );
}

export default LoginPopup;
LoginPopup.propTypes = {
  setShowLogin: PropTypes.func,
};
