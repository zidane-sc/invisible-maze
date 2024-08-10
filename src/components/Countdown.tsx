// src/components/Countdown.tsx
import React, { useState, useEffect } from 'react'

interface CountdownProps {
  initialTime: number
  onTimeUp: () => void
}

const Countdown: React.FC<CountdownProps> = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime)

  useEffect(() => {
    setTimeLeft(initialTime)
  }, [initialTime])

  useEffect(() => {
    if (timeLeft <= 0) return

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId)
          onTimeUp()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeLeft, onTimeUp])

  return (
    <div className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded">
      Time Left: {timeLeft}s
    </div>
  )
}

export default Countdown
