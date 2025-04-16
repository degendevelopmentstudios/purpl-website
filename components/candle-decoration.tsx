"use client"

import { useEffect, useState } from "react"
import Candle from "./candle"

export default function CandleDecoration() {
  const [candles, setCandles] = useState<
    Array<{
      id: number
      x: string
      y: string
      size: "sm" | "md" | "lg"
      purpleFlame: boolean
      moveSpeed: number
      moveDirection: { x: number; y: number }
      position: { x: number; y: number }
      zIndex: number
    }>
  >([])

  useEffect(() => {
    // Generate random candle positions
    const newCandles = []
    const candleCount = Math.floor(Math.random() * 8) + 12 // 12-20 candles

    for (let i = 0; i < candleCount; i++) {
      const x = Math.random() * 90 + 5 // 5-95%
      const y = Math.random() * 90 + 5 // 5-95%
      const zIndex = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1

      newCandles.push({
        id: i,
        x: `${x}%`,
        y: `${y}%`,
        size: ["sm", "md", "lg"][Math.floor(Math.random() * 3)] as "sm" | "md" | "lg",
        purpleFlame: Math.random() > 0.5, // 50% chance of purple flame
        moveSpeed: Math.random() * 0.8 + 0.2, // Random speed between 0.2 and 1.0
        moveDirection: {
          x: Math.random() > 0.5 ? 1 : -1,
          y: Math.random() > 0.5 ? 1 : -1,
        },
        position: { x, y },
        zIndex: zIndex,
      })
    }

    setCandles(newCandles)
  }, [])

  // Move candles around
  useEffect(() => {
    if (candles.length === 0) return

    const moveInterval = setInterval(() => {
      setCandles((prevCandles) => {
        return prevCandles.map((candle) => {
          // Calculate new position
          let newX = candle.position.x + candle.moveDirection.x * candle.moveSpeed * 0.1
          let newY = candle.position.y + candle.moveDirection.y * candle.moveSpeed * 0.1

          // Check boundaries and change direction if needed
          let newDirectionX = candle.moveDirection.x
          let newDirectionY = candle.moveDirection.y

          if (newX < -5) {
            newX = 105
          } else if (newX > 105) {
            newX = -5
          }

          if (newY < -5) {
            newY = 105
          } else if (newY > 105) {
            newY = -5
          }

          // Randomly change direction occasionally
          if (Math.random() < 0.005) newDirectionX *= -1
          if (Math.random() < 0.005) newDirectionY *= -1

          return {
            ...candle,
            x: `${newX}%`,
            y: `${newY}%`,
            position: { x: newX, y: newY },
            moveDirection: { x: newDirectionX, y: newDirectionY },
          }
        })
      })
    }, 50)

    return () => clearInterval(moveInterval)
  }, [candles])

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {candles.map((candle) => (
        <div
          key={candle.id}
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            left: candle.x,
            top: candle.y,
            transform: "translate(-50%, -50%)",
            zIndex: candle.zIndex,
            opacity: candle.zIndex === -1 ? 0.4 : 1,
          }}
        >
          <Candle size={candle.size} purpleFlame={candle.purpleFlame} />
        </div>
      ))}
    </div>
  )
}
