import React from 'react'
import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Welcome to Invisible Maze</h1>

      <div className="mt-8 mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-xl mb-2">How To Play</h2>
        <p className="text-lg mb-4">
          You will have some time to memorize the maze boundaries. Navigate
          through the maze using the arrow keys or the on-screen controls. Avoid
          the boundaries and find the path from the start to the finish. You
          have a limited number of lives, so proceed with caution!
        </p>
      </div>

      <Link
        href="/level-selector"
        className="p-4 bg-blue-500 text-white rounded mb-4"
      >
        Start Game
      </Link>
    </div>
  )
}

export default Home
