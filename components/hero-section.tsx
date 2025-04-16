"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Create random sparkles
    const newSparkles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }))
    setSparkles(newSparkles)
  }, [])

  return (
    <section className="relative min-h-screen pt-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center flex flex-col items-center"
      >
        <motion.div
          className="mb-8 inline-block"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className={`relative ${isHovering ? "meme-shake" : "floating"}`}>
            <Image
              src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/mascot-transparent.png"
              alt="Purple Panther Phoenix Unicorn"
              width={300}
              height={300}
              className="glow mx-auto"
              priority
            />
            {isHovering && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/70 text-purple-300 px-4 py-2 rounded-full font-bold">
                Click me!
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <Image
            src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/pppu-text.png"
            alt="Purple Panther Phoenix Unicorn"
            width={600}
            height={200}
            className="max-w-full h-auto"
          />
        </motion.div>

        <motion.div
          className="text-xl md:text-2xl text-purpl-light mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="mb-4">
            <span className="doge-text text-yellow-300 mr-2">2 days after "Unicorn Day"</span> the 2 candles stayed
            lit...
          </p>
          <p className="mb-4">
            On the 11th a mystical energy arose from the ashes...{" "}
            <span className="neon-purple font-bold">A PURPLE PANTHER PHOENIX UNICORN!</span>
          </p>
          <p className="mb-4">
            It feeds off of the Purple Stuff (<span className="text-purpl font-bold">$PURPL</span>)!
          </p>
          <p>
            <span className="text-purpl font-bold">$PURPL</span> <span className="text-gold">11,000,000,000</span>
            <br />
            Purple Panther Phoenix Unicorn NFTs <span className="text-gold">10,000</span>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a
            href="#about"
            className="px-8 py-3 bg-gradient-to-r from-purpl to-cosmic-dark rounded-full text-white font-bold text-lg hover:opacity-90 transition-opacity meme-hover"
          >
            Learn More
          </a>
          <a
            href="#tokenomics"
            className="px-8 py-3 bg-gradient-to-r from-gold to-yellow-400 rounded-full text-cosmic-dark font-bold text-lg hover:opacity-90 transition-opacity meme-hover"
          >
            Tokenomics
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
