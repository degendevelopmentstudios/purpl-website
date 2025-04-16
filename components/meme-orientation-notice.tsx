"use client"

import { useState, useEffect } from "react"
import { RotateCw } from "lucide-react"

export const MemeOrientationNotice = () => {
  const [isPortrait, setIsPortrait] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window !== "undefined") {
        setIsPortrait(window.innerHeight > window.innerWidth)
      }
    }

    checkOrientation()
    window.addEventListener("resize", checkOrientation)

    return () => {
      window.removeEventListener("resize", checkOrientation)
    }
  }, [])

  if (!isPortrait || dismissed) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-cosmic-dark/90 rounded-xl p-6 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <RotateCw size={48} className="text-purpl animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold mb-2 cosmic-text">Rotate Your Device</h3>
        <p className="text-gray-300 mb-6">
          For the best meme creation experience, please rotate your device to landscape mode.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDismissed(true)}
            className="px-6 py-3 bg-gradient-to-r from-purpl to-cosmic rounded-full text-white font-bold"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  )
}
