"use client"

import { useState, useRef } from "react"
import EnhancedMemeGenerator from "./enhanced-meme-generator"

export default function MemeSection() {
  const [memeIndex, setMemeIndex] = useState(0)
  const [showFullGenerator, setShowFullGenerator] = useState(false)
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null)
  const memePreviewRef = useRef<HTMLDivElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)
  const [currentMeme, setCurrentMeme] = useState<any>(null)

  // Expanded meme templates with more variety and craziness
  const memes = [
    {
      topText: "When $PURPL hits $1",
      bottomText: "Lambos for everyone",
      image:
        "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/mascot-transparent.png",
      background: "bg-gradient-to-r from-purple-900 to-indigo-900",
      textColor: "text-white",
      textStyle: "font-bold",
      textAnimation: "",
      filter: "",
    },
    {
      topText: "Me explaining $PURPL",
      bottomText: "to my family",
      image:
        "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-logo.png",
      background: "bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900",
      textColor: "text-yellow-400",
      textStyle: "font-comic",
      textAnimation: "",
      filter: "",
    },
    {
      topText: "Diamond hooves",
      bottomText: "activated",
      image:
        "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/energy-ball.png",
      background: "bg-gradient-to-tr from-cosmic-dark to-purpl-dark",
      textColor: "neon-purple",
      textStyle: "font-bold",
      textAnimation: "animate-pulse",
      filter: "brightness-110 contrast-125",
    },
    {
      topText: "Such purple",
      bottomText: "much wow",
      image:
        "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/flower-purpl.png",
      background: "bg-gradient-to-r from-purpl to-cosmic",
      textColor: "doge-text",
      textStyle: "font-comic",
      textAnimation: "",
      filter: "",
    },
    // Adding more crazy memes
    {
      topText: "HODL $PURPL",
      bottomText: "or get rekt",
      image:
        "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/diamond-hands.png",
      background: "bg-gradient-to-bl from-purple-800 via-pink-800 to-purple-900",
      textColor: "rainbow-text",
      textStyle: "uppercase font-bold",
      textAnimation: "animate-shake",
      filter: "hue-rotate-90 saturate-200 brightness-125",
    },
    {
      topText: "When someone asks",
      bottomText: "what crypto to buy",
      image:
        "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/purple-unicorn.png",
      background: "bg-gradient-to-r from-black via-purple-900 to-black",
      textColor: "cyberpunk-text",
      textStyle: "font-bold",
      textAnimation: "animate-float",
      filter: "contrast-125 saturate-150",
    },
    {
      topText: "My brain on",
      bottomText: "$PURPL",
      image:
        "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/purple-galaxy.png",
      background: "bg-cosmic-dark",
      textColor: "vaporwave-text",
      textStyle: "font-comic font-bold",
      textAnimation: "animate-pulse",
      filter: "hue-rotate-180 saturate-200 contrast-150",
    },
    {
      topText: "Wen moon?",
      bottomText: "Now moon!",
      image:
        "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/crypto-moon.png",
      background: "bg-gradient-to-br from-purple-900 via-purple-800 to-yellow-900",
      textColor: "holographic-text",
      textStyle: "uppercase font-bold",
      textAnimation: "animate-bounce",
      filter: "brightness-125 contrast-125 saturate-150",
    },
    {
      topText: "Crypto experts",
      bottomText: "watching $PURPL charts",
      image:
        "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/wojak-bull.png",
      background: "bg-gradient-to-r from-purple-900 to-indigo-900",
      textColor: "text-white",
      textStyle: "font-bold",
      textAnimation: "animate-spin",
      filter: "sepia brightness-110",
    },
  ]

  // Set current meme on component mount
  useState(() => {
    setCurrentMeme(memes[memeIndex])
  })

  // Function to handle saving the meme
  const handleSaveMeme = async () => {
    try {
      if (!memePreviewRef.current) {
        console.error("Meme preview ref is null")
        return
      }

      // Implementation would go here
      console.log("Save meme functionality would be implemented here")
    } catch (error) {
      console.error("Error saving meme:", error)
    }
  }

  return (
    <section id="memes" className="py-16 bg-cosmic-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-comic font-bold mb-8 cosmic-text text-center">
          $PURPL Meme Generator
        </h2>

        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => setShowFullGenerator(true)}
            className="px-6 py-3 bg-gradient-to-r from-purpl to-cosmic rounded-full text-white font-bold text-lg mb-8 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/20"
          >
            Open Full Meme Generator
          </button>

          {showFullGenerator && (
            <div className="w-full max-w-4xl">
              <div className="bg-cosmic-dark/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold cosmic-text">Create Your $PURPL Meme</h3>
                  <button onClick={() => setShowFullGenerator(false)} className="text-white hover:text-purple-300">
                    Close
                  </button>
                </div>

                {/* This is where we would import the EnhancedMemeGenerator component */}
                <EnhancedMemeGenerator />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
