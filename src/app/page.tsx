import React from 'react'
import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Selamat Datang di Invisible Maze</h1>
      <Link
        href="/level-selector"
        className="p-4 bg-blue-500 text-white rounded"
      >
        Mulai Permainan
      </Link>
    </div>
  )
}

export default Home
