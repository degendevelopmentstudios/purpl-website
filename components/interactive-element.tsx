"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function InteractiveElement() {
  const [count, setCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleClick = () => {
    setCount(count + 1)

    if (count >= 9) {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
    }

    // Random position within constraints
    setPosition({
      x: Math.random() * 80 - 40,
      y: Math.random() * 80 - 40,
    })
  }

  const messages = [
    "To the moon! 🚀",
    "Such magic! ✨",
    "Much purple! 💜",
    "Very unicorn! 🦄",
    "So phoenix! 🔥",
    "Wow panther! 🐆",
  ]

  const [randomMessage, setRandomMessage] = useState("")

  useEffect(() => {
    setRandomMessage(messages[Math.floor(Math.random() * messages.length)])
  }, [count])

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-comic font-bold mb-8 cosmic-text">Click the Magical $PURPL</h2>

        <div className="relative h-64 flex items-center justify-center">
          <motion.div
            animate={{
              x: position.x,
              y: position.y,
              rotate: count * 10,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 0.5 }}
            className="relative cursor-pointer"
            onClick={handleClick}
          >
            <Image
              src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-logo.png"
              alt="PURPL Logo"
              width={120}
              height={120}
              className="glow rounded-full"
            />

            {count > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -50 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 text-gold font-bold text-xl"
              >
                +{count}
              </motion.div>
            )}
          </motion.div>

          {showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-gradient-to-r from-purpl to-cosmic-dark p-6 rounded-xl border-2 border-gold">
                <p className="text-2xl font-comic font-bold text-gold">{randomMessage}</p>
                <p className="text-white">You found the secret! Keep clicking for more magic!</p>
              </div>
            </motion.div>
          )}
        </div>

        <p className="text-purpl-light mt-4">
          {count === 0 ? "Click to collect some $PURPL magic!" : `You've collected ${count} $PURPL coins!`}
        </p>
      </div>
    </section>
  )
}
