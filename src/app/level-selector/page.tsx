'use client' // Add this line

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LevelSelector: React.FC = () => {
  const levels = [4, 6, 8] // Contoh level kesulitan

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">Pilih Level Kesulitan</h1>
      <div className="flex flex-wrap gap-4">
        {levels.map((level) => (
          <Link
            key={level}
            href={`/game/${level}`}
            className="p-4 bg-blue-500 text-white rounded"
          >
            Level {level}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LevelSelector
