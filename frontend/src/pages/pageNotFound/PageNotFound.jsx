import React from "react"
import "./pagenotfound.css"
import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className='not-found-container'>
      <h1>404 - Page Not Found</h1>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to='/'>Quay lại trang chủ</Link>
    </div>
  )
}

export default PageNotFound
