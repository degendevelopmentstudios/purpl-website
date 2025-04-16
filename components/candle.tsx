"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface CandleProps {
  size?: "sm" | "md" | "lg"
  className?: string
  purpleFlame?: boolean
}

export default function Candle({ size = "md", className = "", purpleFlame = false }: CandleProps) {
  const [flicker, setFlicker] = useState(0)
  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 })
  const [floatDirection, setFloatDirection] = useState({
    x: Math.random() > 0.5 ? 1 : -1,
    y: Math.random() > 0.5 ? 1 : -1,
  })

  // Size mappings
  const sizes = {
    sm: { width: 40, height: 60 },
    md: { width: 60, height: 90 },
    lg: { width: 80, height: 120 },
  }

  // Flame position adjustments based on size
  const flamePositions = {
    sm: { top: "2px", left: "16px", width: "8px", height: "12px" },
    md: { top: "3px", left: "24px", width: "12px", height: "18px" },
    lg: { top: "4px", left: "32px", width: "16px", height: "24px" },
  }

  useEffect(() => {
    // Create a random flicker effect
    const flickerInterval = setInterval(() => {
      setFlicker(Math.random() * 0.4 + 0.8) // Random value between 0.8 and 1.2
    }, 100)

    // Create a floating effect
    const floatInterval = setInterval(() => {
      setFloatOffset((prev) => {
        // Change direction if reaching limits
        let newDirectionX = floatDirection.x
        let newDirectionY = floatDirection.y

        if (prev.x > 10) newDirectionX = -1
        if (prev.x < -10) newDirectionX = 1
        if (prev.y > 10) newDirectionY = -1
        if (prev.y < -10) newDirectionY = 1

        // Randomly change direction occasionally
        if (Math.random() < 0.02) newDirectionX *= -1
        if (Math.random() < 0.02) newDirectionY *= -1

        setFloatDirection({ x: newDirectionX, y: newDirectionY })

        // Update position
        return {
          x: prev.x + newDirectionX * 0.2,
          y: prev.y + newDirectionY * 0.2,
        }
      })
    }, 50)

    return () => {
      clearInterval(flickerInterval)
      clearInterval(floatInterval)
    }
  }, [floatDirection])

  return (
    <div
      className={`relative ${className} transition-transform duration-500 ease-in-out`}
      style={{
        width: sizes[size].width,
        height: sizes[size].height,
        transform: `translate(${floatOffset.x}px, ${floatOffset.y}px)`,
      }}
    >
      {/* Candle base image */}
      <Image
        src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/candle.png"
        alt="Candle"
        width={sizes[size].width}
        height={sizes[size].height}
        className="object-contain"
      />

      {/* Flame with glow effect */}
      <div
        className="absolute z-10"
        style={{
          ...flamePositions[size],
          opacity: 0.7 + flicker * 0.3,
          filter: `blur(2px) brightness(${1 + flicker * 0.5})`,
          background: purpleFlame
            ? "radial-gradient(ellipse at center, rgba(180, 90, 255, 0.9) 0%, rgba(120, 40, 180, 0.7) 40%, rgba(80, 20, 120, 0.3) 70%, transparent 100%)"
            : "radial-gradient(ellipse at center, rgba(255, 200, 90, 0.9) 0%, rgba(255, 150, 50, 0.7) 40%, rgba(200, 80, 20, 0.3) 70%, transparent 100%)",
          animation: "flicker 0.5s infinite alternate",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          transform: `scale(${0.9 + flicker * 0.2})`,
        }}
      />
    </div>
  )
}
