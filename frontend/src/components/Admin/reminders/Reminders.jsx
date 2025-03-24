import React from "react"
import "../index.css"

const Reminders = () => (
  <div className='reminders'>
    <div className='header'>
      <i className='bx bx-note'></i>
      <h3>Reminders</h3>
      <i className='bx bx-filter'></i>
      <i className='bx bx-plus'></i>
    </div>
    <ul className='task-list'>
      {["Start Our Meeting", "Analyse Our Site", "Play Football"].map(
        (task, index) => (
          <li key={index} className={index < 2 ? "completed" : "not-completed"}>
            <div className='task-title'>
              <i
                className={index < 2 ? "bx bx-check-circle" : "bx bx-x-circle"}
              ></i>
              <p>{task}</p>
            </div>
            <i className='bx bx-dots-vertical-rounded'></i>
          </li>
        )
      )}
    </ul>
  </div>
)

export default Reminders
