import classNames from "classnames/bind"
import { useState } from "react"
import AppDowload from "../../../components/appdowload/AppDownload"
import ExploderMenu from "../../../components/exploderMenu/ExploderMenu"
import FoodList from "../../../components/food/FoodList"
import Header from "../../../components/header/Header"
import styles from "./Home.module.scss"

const cx = classNames.bind(styles)

const Home = () => {
  const [category, setCategory, cartItem] = useState("All")

  console.log(cartItem)

  return (
    <div className={cx("home")}>
      <Header />
      <ExploderMenu category={category} setCategory={setCategory} />
      <FoodList category={category} />
      <AppDowload />
    </div>
  )
}

export default Home
