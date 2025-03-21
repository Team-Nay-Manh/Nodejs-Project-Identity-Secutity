import { assets } from "../../assets/assets";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Footer() {
  return (
    <div className={cx("footer")} id="footer">
      <div className={cx("footer-content")}>
        <div className={cx("footer-content-left")}>
          <img src={assets.logo} alt="Logo" />
          <p>
            A modern fast-food restaurant, bright and comfortable, offering a
            diverse menu including burgers, fries, fried chicken, and refreshing
            drinks, all served quickly in a welcoming environment.
          </p>
          <div className={cx("footer-social-icons")}>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className={cx("footer-content-center")}>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className={cx("footer-content-right")}>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+87522269</li>
            <li>buichibao1601@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className={cx("footer-copyright")}>
        Copyright 2024 🎆 Tomato.com - All Right Reserved
      </p>
    </div>
  );
}

export default Footer;
