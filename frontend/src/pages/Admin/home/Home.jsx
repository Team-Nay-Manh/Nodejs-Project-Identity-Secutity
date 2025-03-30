import Header from "../../../components/Admin/header/Header"
import Insights from "../../../components/Admin/insights/Insights"
import Orders from "../../../components/Admin/orders/Orders"
import RecentOrders from "../../../components/Admin/orders/RecentOrders"
import Reminders from "../../../components/Admin/reminders/Reminders"

function Home() {
  return (
    <>
      <main>
        <Header />
        <Insights />
        <div className='bottom-data'>
        <RecentOrders />
        <Reminders />
        </div>
      </main>
    </>
  )
}

export default Home
