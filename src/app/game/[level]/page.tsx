'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import Maze from '@/components/Maze'
import Countdown from '@/components/Countdown'
import Link from 'next/link'
import { LEVELS } from '@/utils/Constants'

const Game: React.FC = () => {
  const params = useParams()
  const [result, setResult] = useState<boolean | null>(null)
  const [showBoundaries, setShowBoundaries] = useState(true)
  const [size, setSize] = useState(4)
  const [level, setLevel] = useState(LEVELS[0])
  const [lives, setLives] = useState(3)
  const [countdownTime, setCountdownTime] = useState(5)

  const winSound = new Audio('/sounds/win.mp3')
  const loseSound = new Audio('/sounds/lose.mp3')

  React.useEffect(() => {
    if (params.level) {
      const levelSlug = params.level as string
      const level = LEVELS.find((level) => level.slug === levelSlug)

      if (level) {
        setSize(level.size)
        setLevel(level)
        setCountdownTime(level.countdownTime)
      }
    }
  }, [params.level])

  const handleTimeUp = () => {
    setShowBoundaries(false)
  }

  const handleBoundaryHit = () => {
    setLives((prevLives) => {
      const newLives = prevLives - 1
      if (newLives === 0) {
        loseSound.play()
        setResult(false)
        setShowBoundaries(true)
      }

      if (newLives < 0) {
        return 0
      }

      return newLives
    })
  }

  const handleMazeSolved = () => {
    winSound.play()
    setResult(true)
    setShowBoundaries(true)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">{level.name}</h1>
      <Countdown initialTime={countdownTime} onTimeUp={handleTimeUp} />
      <div className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded flex items-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={index < lives ? faHeartSolid : faHeartRegular}
            className="text-red-500 text-xl mr-1"
          />
        ))}
      </div>
      <Maze
        size={size}
        onBoundaryHit={handleBoundaryHit}
        onMazeSolved={handleMazeSolved}
        showBoundaries={showBoundaries}
        lives={lives}
      />

      {result !== null && (
        <div className="mt-4 p-2 bg-gray-800 text-white rounded">
          {result ? 'Selamat, Anda Berhasil!' : 'Anda Gagal'}
        </div>
      )}

      <Link
        href="/level-selector"
        className="mt-8 p-3 bg-blue-500 text-white rounded"
      >
        Select Level
      </Link>
    </div>
  )
}

export default Game
