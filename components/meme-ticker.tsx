"use client"

import { useState, useEffect } from "react"

export default function MemeTicker() {
  const [price, setPrice] = useState(0.00042069)
  const [change, setChange] = useState(0)
  const [isUp, setIsUp] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Random price movement
      const movement = Math.random() * 0.00001 * (Math.random() > 0.5 ? 1 : -1)
      const newPrice = Math.max(0.0000001, price + movement)

      setChange(((newPrice - price) / price) * 100)
      setIsUp(newPrice > price)
      setPrice(newPrice)
    }, 3000)

    return () => clearInterval(interval)
  }, [price])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-40 py-2">
      <div className="marquee">
        <div className="marquee-content">
          <span className="inline-flex items-center gap-8 px-4">
            <span className="font-mono">$PURPL: ${price.toFixed(8)}</span>
            <span className={`font-mono ${isUp ? "text-green-400" : "text-red-400"}`}>
              {isUp ? "↗" : "↘"} {Math.abs(change).toFixed(2)}%
            </span>
            <span className="font-mono">MARKET CAP: $4,206,900</span>
            <span className="font-mono">24H VOLUME: $1,337,420</span>
            <span className="rainbow-text font-bold">MOON SOON!</span>
            <span className="font-mono">HOLDERS: 6,969</span>
            <span className="neon-purple">SUCH WOW!</span>
            <span className="font-mono">$PURPL: ${price.toFixed(8)}</span>
            <span className={`font-mono ${isUp ? "text-green-400" : "text-red-400"}`}>
              {isUp ? "↗" : "↘"} {Math.abs(change).toFixed(2)}%
            </span>
            <span className="font-mono">MARKET CAP: $4,206,900</span>
            <span className="font-mono">24H VOLUME: $1,337,420</span>
            <span className="rainbow-text font-bold">MOON SOON!</span>
            <span className="font-mono">HOLDERS: 6,969</span>
            <span className="neon-purple">SUCH WOW!</span>
          </span>
        </div>
      </div>
    </div>
  )
}
