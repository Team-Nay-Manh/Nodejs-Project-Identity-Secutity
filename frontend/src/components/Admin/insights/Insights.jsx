import React from "react"
import "../index.css"

const Insights = () => (
  <ul className='insights'>
    {[
      { icon: "bx bx-calendar-check", value: "1,074", text: "Paid Order" },
      { icon: "bx bx-show-alt", value: "3,944", text: "Site Visit" },
      { icon: "bx bx-line-chart", value: "14,721", text: "Searches" },
      { icon: "bx bx-dollar-circle", value: "6.742.000₫", text: "Total Sales" }
    ].map((item, index) => (
      <li key={index}>
        <i className={item.icon}></i>
        <span className='info'>
          <h3>{item.value}</h3>
          <p>{item.text}</p>
        </span>
      </li>
    ))}
  </ul>
)

export default Insights
