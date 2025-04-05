import Header from "../../../components/Admin/header/Header"
import Insights from "../../../components/Admin/insights/Insights"
import Orders from "../../../components/Admin/orders/Orders"
import Reminders from "../../../components/Admin/reminders/Reminders"
import "./home.css"

function Home() {
  return (
      <main className='container_admin'>
        <Header />
        <Insights />
        <div className='bottom-data'>
          <Orders />
          <Reminders />
        </div>
      </main>
  )
}

export default Home
