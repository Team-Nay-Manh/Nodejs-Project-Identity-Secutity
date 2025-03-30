import "./login.css"
import { useLogin } from "./useLogin"

function LoginAdminPage() {
  const { login } = useLogin()

  const handleLogin = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    login(data)
  }

  return (
    <div className='login_form'>
      <div className='login-container'>
        <h2>Đăng nhập Admin</h2>
        <form onSubmit={handleLogin} action='/admin/dashboard' method='post'>
          <div className='input-group'>
            <label htmlFor='email'>Tên đăng nhập</label>
            <input type='text' id='email' name='email' required />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Mật khẩu</label>
            <input type='password' id='password' name='password' required />
          </div>
          <button type='submit' className='btn'>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginAdminPage
