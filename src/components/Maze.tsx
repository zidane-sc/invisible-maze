import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFlagCheckered,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'

interface MazeProps {
  size: number
  onBoundaryHit: () => void
  onMazeSolved: () => void
  showBoundaries: boolean
}

const generateMaze = (size: number) => {
  const maze = Array(size)
    .fill(null)
    .map(() => Array(size).fill(false))
  for (let i = 0; i < (size * size) / 4; i++) {
    const row = Math.floor(Math.random() * size)
    const col = Math.floor(Math.random() * size)
    maze[row][col] = true
  }
  return maze
}

const isPathExists = (
  maze: boolean[][],
  start: { row: number; col: number },
  end: { row: number; col: number }
) => {
  const visited = Array(maze.length)
    .fill(null)
    .map(() => Array(maze[0].length).fill(false))
  const queue: { row: number; col: number }[] = [start]
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
  ]

  while (queue.length) {
    const { row, col } = queue.shift()!
    if (row === end.row && col === end.col) return true
    for (const { row: dRow, col: dCol } of directions) {
      const newRow = row + dRow
      const newCol = col + dCol
      if (
        newRow >= 0 &&
        newRow < maze.length &&
        newCol >= 0 &&
        newCol < maze[0].length &&
        !maze[newRow][newCol] &&
        !visited[newRow][newCol]
      ) {
        visited[newRow][newCol] = true
        queue.push({ row: newRow, col: newCol })
      }
    }
  }
  return false
}

const getRandomPosition = (size: number, maze: boolean[][]) => {
  let row, col
  do {
    row = Math.floor(Math.random() * size)
    col = Math.floor(Math.random() * size)
  } while (maze[row][col])
  return { row, col }
}

const getRandomStartAndEnd = (size: number, maze: boolean[][]) => {
  let start, end
  do {
    start = getRandomPosition(size, maze)
    end = getRandomPosition(size, maze)
  } while (
    (start.row === end.row && start.col === end.col) ||
    !isPathExists(maze, start, end)
  )
  return { start, end }
}

const Maze: React.FC<MazeProps> = ({
  size,
  onBoundaryHit,
  onMazeSolved,
  showBoundaries,
}) => {
  const [maze, setMaze] = useState<boolean[][]>([])
  const [playerPos, setPlayerPos] = useState<{ row: number; col: number }>({
    row: 0,
    col: 0,
  })
  const [startPos, setStartPos] = useState<{ row: number; col: number }>({
    row: 0,
    col: 0,
  })
  const [endPos, setEndPos] = useState<{ row: number; col: number }>({
    row: size - 1,
    col: size - 1,
  })
  const [solved, setSolved] = useState<boolean>(false)
  const [dangerCells, setDangerCells] = useState<Set<string>>(new Set())

  const moveSound = new Audio('/sounds/move.mp3')
  const hitSound = new Audio('/sounds/hit.mp3')

  useEffect(() => {
    const initialMaze = generateMaze(size)
    const { start, end } = getRandomStartAndEnd(size, initialMaze)

    setMaze(initialMaze)
    setStartPos(start)
    setEndPos(end)
    setPlayerPos(start)
  }, [size])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (solved) return

    let newRow = playerPos.row
    let newCol = playerPos.col

    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, playerPos.row - 1)
        break
      case 'ArrowDown':
        newRow = Math.min(size - 1, playerPos.row + 1)
        break
      case 'ArrowLeft':
        newCol = Math.max(0, playerPos.col - 1)
        break
      case 'ArrowRight':
        newCol = Math.min(size - 1, playerPos.col + 1)
        break
      default:
        break
    }

    if (maze[newRow][newCol] && !showBoundaries) {
      hitSound.play()
      setDangerCells((prev) => new Set(prev).add(`${newRow},${newCol}`))
      onBoundaryHit()
      setPlayerPos(startPos)
    } else {
      moveSound.play()
      setPlayerPos({ row: newRow, col: newCol })
      if (newRow === endPos.row && newCol === endPos.col) {
        setSolved(true)
        onMazeSolved()
      }
    }
  }

  return (
    <div className="relative">
      <div
        className="relative grid"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        tabIndex={0}
        onKeyDown={handleKeyPress}
      >
        {maze.flat().map((cell, index) => {
          const row = Math.floor(index / size)
          const col = index % size
          const isBoundary = maze[row][col]
          const isDanger = dangerCells.has(`${row},${col}`)
          return (
            <div
              key={index}
              className={`w-8 h-8 ${
                showBoundaries
                  ? isBoundary
                    ? 'bg-gray-700'
                    : 'bg-gray-200'
                  : isDanger
                    ? 'bg-red-500'
                    : 'bg-gray-200'
              } ${playerPos.row === row && playerPos.col === col && !showBoundaries ? 'bg-blue-500' : ''}`}
              style={{
                border:
                  isBoundary && showBoundaries
                    ? '2px solid black'
                    : '2px solid orange',
                gridRow: row + 1,
                gridColumn: col + 1,
              }}
            />
          )
        })}
        {(!showBoundaries || solved) && (
          <>
            <div
              className="absolute"
              style={{
                gridRow: endPos.row + 1,
                gridColumn: endPos.col + 1,
                marginTop: '0.3rem',
                marginLeft: '0.5rem',
              }}
            >
              <FontAwesomeIcon
                icon={faFlagCheckered}
                className="text-black text-xl"
              />
            </div>
            <div
              className="absolute"
              style={{
                gridRow: playerPos.row + 1,
                gridColumn: playerPos.col + 1,
                marginTop: '0.3rem',
                marginLeft: '0.5rem',
              }}
            >
              <FontAwesomeIcon
                icon={faUserAstronaut}
                className="text-blue-500 text-xl"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Maze
