"use client"

import { useState } from "react"
import { Play } from "lucide-react"

export default function VideoFallback() {
  const [showMessage, setShowMessage] = useState(false)

  const handleClick = () => {
    setShowMessage(true)
    // Open YouTube in a new tab
    window.open("https://www.youtube.com/watch?v=aXJhDltzYVQ&t=33s", "_blank")

    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-12 rounded-xl overflow-hidden shadow-2xl">
      <div
        className="relative pb-[56.25%] h-0 bg-cosmic-dark/50 flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/70 to-black/70">
          <div className="w-20 h-20 rounded-full bg-purpl flex items-center justify-center mb-4 hover:scale-110 transition-transform">
            <Play size={40} className="text-white ml-2" />
          </div>
          <p className="text-white text-lg font-bold">Watch Purple Rain</p>
          <p className="text-gray-300 text-sm">Click to open on YouTube</p>
        </div>
      </div>
      <div className="bg-cosmic-dark/80 p-4 text-center">
        <h3 className="text-xl font-bold text-purpl-light">Purple Rain - Prince</h3>
        <p className="text-sm text-gray-300">The perfect soundtrack for your $PURPL journey</p>

        {showMessage && (
          <div className="mt-2 p-2 bg-green-600/30 rounded-md">
            <p className="text-green-300">Opening YouTube in a new tab...</p>
          </div>
        )}
      </div>
    </div>
  )
}
