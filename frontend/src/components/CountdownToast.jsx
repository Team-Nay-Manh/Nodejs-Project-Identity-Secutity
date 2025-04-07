import React, { useEffect, useState } from "react"

const CountdownToast = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div style={{ fontSize: "0.9em", color: "white" }}>
      Thời gian chờ còn lại: {formatTime(timeLeft)}
    </div>
  )
}

export default CountdownToast
