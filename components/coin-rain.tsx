"use client"

import { useState } from "react"

interface Coin {
  id: number
  left: number
  animationDuration: number
  delay: number
}

export default function CoinRain() {
  const [isRaining, setIsRaining] = useState(false)
  const [coins, setCoins] = useState<Coin[]>([])

  const makeItRain = () => {
    setIsRaining(true)

    // Create 50 coins
    const newCoins = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }))

    setCoins(newCoins)

    // Stop the rain after 8 seconds
    setTimeout(() => {
      setIsRaining(false)
      setCoins([])
    }, 8000)
  }

  return (
    <div className="text-center my-12">
      <button
        onClick={makeItRain}
        disabled={isRaining}
        className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full text-xl font-bold text-white hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 meme-hover"
      >
        {isRaining ? "It's Raining $PURPL!" : "Make It Rain $PURPL!"}
      </button>

      {isRaining && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="coin absolute top-0"
              style={{
                left: `${coin.left}%`,
                animation: `fall ${coin.animationDuration}s linear forwards`,
                animationDelay: `${coin.delay}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
