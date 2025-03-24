import { assets } from "../../assets/assets";
import styles from "./AppDownload.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AppDownload() {
  return (
    <div className={cx("app-download")} id="mobile-app">
      <p>
        For Better Experience Download <br />
        Tomato App
      </p>
      <div className={cx("app-download-platforms")}>
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
}

export default AppDownload;
