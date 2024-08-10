import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface ControllerProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void
  onReset: () => void
}

const Controller: React.FC<ControllerProps> = ({ onMove, onReset }) => {
  return (
    <div className="fixed bottom-0 mb-5 flex flex-col items-center gap-4">
      {/* Up Button */}
      <button
        className="bg-gray-700 text-white p-5 rounded-full shadow-lg border-4 border-gray-600 hover:bg-gray-600 active:bg-gray-500 transition"
        onClick={() => onMove('up')}
      >
        {/* icon arrowUp */}
        <FontAwesomeIcon icon={faArrowUp} className="text-2xl" />
      </button>

      {/* Left and Right Buttons */}
      <div className="flex gap-4">
        <button
          className="bg-gray-700 text-white p-5 rounded-full shadow-lg border-4 border-gray-600 hover:bg-gray-600 active:bg-gray-500 transition"
          onClick={() => onMove('left')}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </button>
        <button
          className="bg-blue-700 text-white p-5 rounded-full shadow-lg border-4"
          onClick={() => onReset()}
        >
          <FontAwesomeIcon icon={faRefresh} className="text-2xl" />
        </button>
        <button
          className="bg-gray-700 text-white p-5 rounded-full shadow-lg border-4 border-gray-600 hover:bg-gray-600 active:bg-gray-500 transition"
          onClick={() => onMove('right')}
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
        </button>
      </div>

      {/* Down Button */}
      <button
        className="bg-gray-700 text-white p-5 rounded-full shadow-lg border-4 border-gray-600 hover:bg-gray-600 active:bg-gray-500 transition"
        onClick={() => onMove('down')}
      >
        <FontAwesomeIcon icon={faArrowDown} className="text-2xl" />
      </button>
    </div>
  )
}

export default Controller
