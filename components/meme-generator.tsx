"use client"

import { useState } from "react"
import Image from "next/image"

const memeTexts = [
  "such $PURPL",
  "very unicorn",
  "much phoenix",
  "wow panther",
  "so magical",
  "to the moon",
  "very crypto",
  "such gains",
  "wow tokenomics",
  "diamond hooves",
]

const memeColors = ["text-yellow-300", "text-green-400", "text-pink-500", "text-blue-400", "text-red-400"]

export default function MemeGenerator() {
  const [memes, setMemes] = useState<
    Array<{ id: number; text: string; color: string; x: number; y: number; rotate: number }>
  >([])
  const [memeCount, setMemeCount] = useState(0)

  const addMeme = () => {
    const newMeme = {
      id: memeCount,
      text: memeTexts[Math.floor(Math.random() * memeTexts.length)],
      color: memeColors[Math.floor(Math.random() * memeColors.length)],
      x: Math.random() * 80,
      y: Math.random() * 80,
      rotate: Math.random() * 30 - 15,
    }

    setMemes([...memes, newMeme])
    setMemeCount(memeCount + 1)

    // Remove oldest meme if there are more than 10
    if (memes.length >= 10) {
      const newMemes = [...memes]
      newMemes.shift()
      setMemes(newMemes)
    }
  }

  return (
    <div className="relative h-96 w-full bg-purple-900/30 rounded-xl overflow-hidden my-12">
      <div className="absolute inset-0">
        {memes.map((meme) => (
          <div
            key={meme.id}
            className={`absolute doge-text text-2xl font-bold ${meme.color}`}
            style={{
              left: `${meme.x}%`,
              top: `${meme.y}%`,
              transform: `rotate(${meme.rotate}deg)`,
            }}
          >
            {meme.text}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={addMeme}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all meme-hover"
        >
          Generate Meme Text
        </button>
      </div>

      <div className="absolute top-4 left-4">
        <Image
          src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/mascot.png"
          alt="PURPL Mascot"
          width={100}
          height={100}
          className="meme-hover"
        />
      </div>
    </div>
  )
}
