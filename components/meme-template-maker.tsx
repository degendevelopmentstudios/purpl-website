"use client"

import { useState } from "react"
import Image from "next/image"

// Meme template options
const memeTemplates = [
  {
    id: 1,
    name: "Mascot",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/mascot-transparent.png",
    width: 400,
    height: 400,
  },
  {
    id: 2,
    name: "Energy Ball",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/energy-ball.png",
    width: 400,
    height: 400,
  },
  {
    id: 3,
    name: "Purple Flowers",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/flower-purpl.png",
    width: 400,
    height: 400,
  },
  {
    id: 4,
    name: "Purple Atom",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/atom-purple.png",
    width: 400,
    height: 400,
  },
  {
    id: 5,
    name: "Purple Glitter",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purple-glitter.png",
    width: 400,
    height: 400,
  },
  {
    id: 6,
    name: "PURPL Text",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-chrome.png",
    width: 400,
    height: 100,
  },
  {
    id: 7,
    name: "Mascot",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/mascot.png",
    width: 400,
    height: 400,
  },
  {
    id: 8,
    name: "Mascot Transparent",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/mascot-transparent.png",
    width: 400,
    height: 400,
  },
  {
    id: 9,
    name: "PPPU Text",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/pppu-text.png",
    width: 600,
    height: 200,
  },
  {
    id: 10,
    name: "Atom Sparkle",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/atom-sparkle.png",
    width: 400,
    height: 400,
  },
  {
    id: 11,
    name: "Purpl Glow",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-glow.png",
    width: 400,
    height: 400,
  },
  {
    id: 12,
    name: "Purpl Glow Text",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-glow-text.png",
    width: 400,
    height: 100,
  },
  {
    id: 13,
    name: "DDS Logo",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/dds-logo.png",
    width: 400,
    height: 200,
  },
  {
    id: 14,
    name: "Candle",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/candle.png",
    width: 200,
    height: 300,
  },
  {
    id: 15,
    name: "Nutmeg Logo",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/nutmeg-logo.png",
    width: 300,
    height: 300,
  },
  {
    id: 16,
    name: "Nutmeg Text",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/nutmeg-text.png",
    width: 400,
    height: 100,
  },
]

// Meme text options
const memeTexts = [
  "When $PURPL hits $1",
  "Such purple, much wow",
  "Panther + Phoenix + Unicorn = $PURPL",
  "XPR Network's favorite meme coin",
  "Nutmeg approves this meme",
  "Degen Hoopers to the moon",
  "NFT collectors be like",
  "Crypto winter? Never heard of it",
  "Diamond hooves activated",
  "When you buy the dip and it keeps dipping",
  "Me explaining $PURPL to my family",
  "XPR + $PURPL = 🚀",
  "Waiting for $PURPL to moon",
  "This is the way",
  "HODL $PURPL forever",
]

// Text positions
const textPositions = [
  { name: "Top", value: "top" },
  { name: "Bottom", value: "bottom" },
  { name: "Top & Bottom", value: "both" },
]

// Text colors
const textColors = [
  { name: "White", value: "text-white" },
  { name: "Purple", value: "text-purple-400" },
  { name: "Gold", value: "text-yellow-400" },
  { name: "Neon Purple", value: "neon-purple" },
  { name: "Rainbow", value: "rainbow-text" },
]

export default function MemeTemplateMaker() {
  const [selectedTemplate, setSelectedTemplate] = useState(memeTemplates[0])
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [textPosition, setTextPosition] = useState("both")
  const [textColor, setTextColor] = useState("text-white")
  const [generatedMemes, setGeneratedMemes] = useState<
    Array<{ id: number; template: any; top: string; bottom: string; position: string; color: string }>
  >([])
  const [memeCount, setMemeCount] = useState(0)

  const generateRandomMeme = () => {
    const randomTemplate = memeTemplates[Math.floor(Math.random() * memeTemplates.length)]
    const randomText = memeTexts[Math.floor(Math.random() * memeTexts.length)]
    const randomPosition = textPositions[Math.floor(Math.random() * textPositions.length)].value
    const randomColor = textColors[Math.floor(Math.random() * textColors.length)].value

    let newTopText = ""
    let newBottomText = ""

    if (randomPosition === "top" || randomPosition === "both") {
      newTopText = randomText
    }

    if (randomPosition === "bottom" || randomPosition === "both") {
      newBottomText = randomPosition === "both" ? memeTexts[Math.floor(Math.random() * memeTexts.length)] : randomText
    }

    setSelectedTemplate(randomTemplate)
    setTopText(newTopText)
    setBottomText(newBottomText)
    setTextPosition(randomPosition)
    setTextColor(randomColor)
  }

  const saveMeme = () => {
    const newMeme = {
      id: memeCount,
      template: selectedTemplate,
      top: topText,
      bottom: bottomText,
      position: textPosition,
      color: textColor,
    }

    setGeneratedMemes([...generatedMemes, newMeme])
    setMemeCount(memeCount + 1)

    // Reset form
    setTopText("")
    setBottomText("")
    setTextPosition("both")
    setTextColor("text-white")
  }

  const handleTemplateChange = (template: any) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-cosmic-dark/40 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4 cosmic-text">Create Your $PURPL Meme</h3>

          <div className="mb-6">
            <label className="block text-purpl-light mb-2">Select Template</label>
            <div className="grid grid-cols-3 gap-2">
              {memeTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                    selectedTemplate.id === template.id ? "border-gold" : "border-transparent"
                  }`}
                  onClick={() => handleTemplateChange(template)}
                >
                  <div className="h-20 bg-cosmic-dark/50 flex items-center justify-center">
                    <Image
                      src={template.src || "/placeholder.svg"}
                      alt={template.name}
                      width={60}
                      height={60}
                      className="object-contain h-16 w-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="topText" className="block text-purpl-light mb-2">
              Top Text
            </label>
            <input
              type="text"
              id="topText"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              className="w-full bg-cosmic-dark/70 border border-purpl rounded-lg px-4 py-2 text-white"
              placeholder="Enter top text"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bottomText" className="block text-purpl-light mb-2">
              Bottom Text
            </label>
            <input
              type="text"
              id="bottomText"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              className="w-full bg-cosmic-dark/70 border border-purpl rounded-lg px-4 py-2 text-white"
              placeholder="Enter bottom text"
            />
          </div>

          <div className="mb-4">
            <label className="block text-purpl-light mb-2">Text Position</label>
            <div className="flex gap-4">
              {textPositions.map((pos) => (
                <label key={pos.value} className="flex items-center">
                  <input
                    type="radio"
                    name="textPosition"
                    value={pos.value}
                    checked={textPosition === pos.value}
                    onChange={() => setTextPosition(pos.value)}
                    className="mr-2"
                  />
                  <span>{pos.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-purpl-light mb-2">Text Color</label>
            <div className="flex flex-wrap gap-4">
              {textColors.map((color) => (
                <label key={color.value} className="flex items-center">
                  <input
                    type="radio"
                    name="textColor"
                    value={color.value}
                    checked={textColor === color.value}
                    onChange={() => setTextColor(color.value)}
                    className="mr-2"
                  />
                  <span className={color.value}>{color.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateRandomMeme}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all meme-hover"
            >
              Random Meme
            </button>

            <button
              onClick={saveMeme}
              className="px-6 py-3 bg-gradient-to-r from-gold to-yellow-500 rounded-full text-cosmic-dark font-bold hover:opacity-90 transition-all meme-hover"
            >
              Save Meme
            </button>
          </div>
        </div>

        <div className="bg-cosmic-dark/40 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4 cosmic-text">Meme Preview</h3>

          <div className="relative bg-transparent rounded-xl overflow-hidden flex items-center justify-center h-80">
            <div className="relative">
              <Image
                src={selectedTemplate.src || "/placeholder.svg"}
                alt="Meme Template"
                width={selectedTemplate.width}
                height={selectedTemplate.height}
                className="meme-template-img"
              />

              {(textPosition === "top" || textPosition === "both") && topText && (
                <div className="absolute top-2 left-0 right-0 text-center">
                  <h3 className={`text-2xl font-bold ${textColor} bg-black/50 py-2 px-4 inline-block rounded-full`}>
                    {topText}
                  </h3>
                </div>
              )}

              {(textPosition === "bottom" || textPosition === "both") && bottomText && (
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <h3 className={`text-2xl font-bold ${textColor} bg-black/50 py-2 px-4 inline-block rounded-full`}>
                    {bottomText}
                  </h3>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-xl font-bold mb-2 text-purpl-light">Saved Memes</h4>

            {generatedMemes.length === 0 ? (
              <p className="text-gray-400">No saved memes yet. Create and save some memes!</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-h-40 overflow-y-auto">
                {generatedMemes.map((meme) => (
                  <div key={meme.id} className="relative bg-cosmic-dark/70 rounded-lg overflow-hidden p-2">
                    <div className="relative h-24 flex items-center justify-center">
                      <Image
                        src={meme.template.src || "/placeholder.svg"}
                        alt="Saved Meme"
                        width={100}
                        height={100}
                        className="h-20 w-auto object-contain"
                      />

                      {(meme.position === "top" || meme.position === "both") && meme.top && (
                        <div className="absolute top-0 left-0 right-0 text-center">
                          <p className={`text-xs font-bold ${meme.color} truncate px-1`}>{meme.top}</p>
                        </div>
                      )}

                      {(meme.position === "bottom" || meme.position === "both") && meme.bottom && (
                        <div className="absolute bottom-0 left-0 right-0 text-center">
                          <p className={`text-xs font-bold ${meme.color} truncate px-1`}>{meme.bottom}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
