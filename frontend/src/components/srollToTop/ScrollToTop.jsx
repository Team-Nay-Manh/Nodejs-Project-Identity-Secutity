import styles from "./ScrollToTop.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ScrollToTop() {
  return (
    <a className={cx("container")} href="#navbar">
      👆
    </a>
  );
}

export default ScrollToTop;
