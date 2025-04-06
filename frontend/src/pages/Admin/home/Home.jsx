import Header from "../../../components/Admin/header/Header";
import Insights from "../../../components/Admin/insights/Insights";
import RecentOrders from "../../../components/Admin/orders/RecentOrders";
import Reminders from "../../../components/Admin/reminders/Reminders";
import "./home.css";

function Home() {
  return (
    <>
      <main className="container_admin">
        <Header />
        <Insights />
        <div className="bottom-data">
          <RecentOrders />
          <Reminders />
        </div>
      </main>
    </>
  );
}

export default Home;
