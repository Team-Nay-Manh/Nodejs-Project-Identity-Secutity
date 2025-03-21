import styles from "./GlobalStyles.module.scss";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function GlobalStyled({ children }) {
  return <div className={cx("container")}>{children}</div>;
}

export default GlobalStyled;

GlobalStyled.propTypes = {
  children: PropTypes.node.isRequired, // `node` có thể là bất cứ thứ gì có thể render được (string, element, array, etc.)
};
