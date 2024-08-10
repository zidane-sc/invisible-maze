'use client' // Add this line

import React from 'react'
import Link from 'next/link'
import { LEVELS } from '@/utils/Constants'

const LevelSelector: React.FC = () => {
  const levels = LEVELS

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">Pilih Level Kesulitan</h1>
      <div className="flex flex-wrap gap-4">
        {levels.map((level) => (
          <Link
            key={level.name}
            href={`/game/${level.slug}`}
            className="p-4 bg-blue-500 text-white rounded"
          >
            {level.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LevelSelector
