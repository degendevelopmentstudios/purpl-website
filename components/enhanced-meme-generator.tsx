"use client"

import { useState, useRef, useEffect } from "react"
import {
  Save,
  ImageIcon,
  Paintbrush,
  Smile,
  Settings,
  Sliders,
  Text,
  X,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Wand2,
} from "lucide-react"
import ImageSaver from "./image-saver"
import html2canvas from "html2canvas"
import { useMobile } from "@/hooks/use-mobile"
import MSPaint from "./ms-paint"
import EmojiPicker from "./emoji-picker"

// Expanded base meme templates with all available images
const baseImages = [
  {
    id: 1,
    name: "Purple Logo",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-logo.png",
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
  // Adding new images from the provided IPFS link
  {
    id: 17,
    name: "Purple Coin",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/purple-coin.png",
    width: 400,
    height: 400,
  },
  {
    id: 18,
    name: "Purple Diamond",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/purple-diamond.png",
    width: 400,
    height: 400,
  },
  {
    id: 19,
    name: "Purple Galaxy",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/purple-galaxy.png",
    width: 500,
    height: 500,
  },
  {
    id: 20,
    name: "Purple Unicorn",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/purple-unicorn.png",
    width: 400,
    height: 400,
  },
  {
    id: 21,
    name: "Diamond Hands",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/diamond-hands.png",
    width: 400,
    height: 400,
  },
  {
    id: 22,
    name: "Wojak Bull",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/wojak-bull.png",
    width: 400,
    height: 400,
  },
  {
    id: 23,
    name: "Crypto Moon",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/crypto-moon.png",
    width: 400,
    height: 400,
  },
  {
    id: 24,
    name: "Lambo Moon",
    src: "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/lambo-moon.png",
    width: 500,
    height: 400,
  },
]

// Background patterns - expanded for more variety
const backgroundPatterns = [
  {
    name: "Purple Gradient",
    value: "bg-gradient-to-r from-purple-900 to-indigo-900",
  },
  {
    name: "Cosmic Blend",
    value: "bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900",
  },
  {
    name: "Dark Cosmic",
    value: "bg-gradient-to-tr from-cosmic-dark to-purpl-dark",
  },
  {
    name: "Purpl Cosmic",
    value: "bg-gradient-to-r from-purpl to-cosmic",
  },
  {
    name: "Pink Blend",
    value: "bg-gradient-to-bl from-purple-800 via-pink-800 to-purple-900",
  },
  {
    name: "Dark Edges",
    value: "bg-gradient-to-r from-black via-purple-900 to-black",
  },
  {
    name: "Cosmic Dark",
    value: "bg-cosmic-dark",
  },
  {
    name: "Gold Accent",
    value: "bg-gradient-to-br from-purple-900 via-purple-800 to-yellow-900",
  },
]

// Filters for images
const imageFilters = [
  { name: "None", value: "filter-none" },
  { name: "Bright", value: "brightness-110 contrast-125" },
  { name: "Warm", value: "hue-rotate-15 saturate-150" },
  { name: "Cool", value: "hue-rotate-30 brightness-110" },
  { name: "Green Tint", value: "hue-rotate-60 contrast-110" },
  { name: "Blue Tint", value: "hue-rotate-90 saturate-125" },
  { name: "Inverted", value: "hue-rotate-180 brightness-125" },
  { name: "Vintage", value: "sepia brightness-110" },
]

// Text positions
const textPositions = [
  { name: "Top", value: "top" },
  { name: "Bottom", value: "bottom" },
  { name: "Top & Bottom", value: "both" },
  { name: "Middle", value: "middle" },
]

// Text colors
const textColors = [
  { name: "White", value: "text-white" },
  { name: "Purple", value: "text-purple-400" },
  { name: "Gold", value: "text-yellow-400" },
  { name: "Neon Purple", value: "neon-purple" },
  { name: "Rainbow", value: "rainbow-text" },
  { name: "Pink", value: "text-pink-400" },
]

// Text styles
const textStyles = [
  { name: "Normal", value: "font-normal" },
  { name: "Bold", value: "font-bold" },
  { name: "Comic", value: "font-comic" },
  { name: "Italic", value: "italic" },
  { name: "Uppercase", value: "uppercase" },
  { name: "Comic Bold", value: "font-comic font-bold" },
]

// Text animations
const textAnimations = [
  { name: "None", value: "" },
  { name: "Pulse", value: "animate-pulse" },
  { name: "Bounce", value: "animate-bounce" },
  { name: "Spin", value: "animate-spin" },
  { name: "Float", value: "animate-float" },
]

// Expanded meme text options
const memeTexts = [
  "When $PURPL hits $1",
  "Such purple, much wow",
  "Panther + Phoenix + Unicorn = $PURPL",
  "XPR Network's favorite meme coin",
  "Nutmeg approves this meme",
  "Diamond hooves activated",
  "Me explaining $PURPL to my family",
  "XPR + $PURPL = 🚀",
  "Waiting for $PURPL to moon",
  "HODL $PURPL forever",
  "Purple magic activated",
  "Unicorn powers unleashed",
  "To the moon and beyond",
  "Wen lambo?",
  "PURPL gang assemble",
]

// Random meme templates
const randomMemeTemplates = [
  {
    topText: "When $PURPL hits $1",
    bottomText: "Lambos for everyone",
    image:
      "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/mascot-transparent.png",
    background: "bg-gradient-to-r from-purple-900 to-indigo-900",
    textColor: "text-white",
    textStyle: "font-bold",
    textAnimation: "",
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
  },
  {
    topText: "Such purple",
    bottomText: "much wow",
    image:
      "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/flower-purpl.png",
    background: "bg-gradient-to-r from-purpl to-cosmic",
    textColor: "text-white",
    textStyle: "font-comic",
    textAnimation: "",
  },
  {
    topText: "HODL $PURPL",
    bottomText: "or get rekt",
    image:
      "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/diamond-hands.png",
    background: "bg-gradient-to-bl from-purple-800 via-pink-800 to-purple-900",
    textColor: "rainbow-text",
    textStyle: "uppercase font-bold",
    textAnimation: "animate-float",
  },
]

// Layer interface
interface MemeLayer {
  id: string
  name: string
  type: "image" | "paint"
  src?: string
  dataUrl?: string
  visible: boolean
  zIndex: number
  opacity: number
  scale: number
  rotation: number
  x: number
  y: number
  filter: string
}

// Emoji stamp interface
interface EmojiStamp {
  id: string
  emoji: string
  x: number
  y: number
  scale: number
  rotation: number
}

// Tool tabs
type ToolTab = "text" | "layers" | "emojis" | "settings" | "effects" | "paint"

export default function EnhancedMemeGenerator() {
  const isMobile = useMobile()

  // Text state
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [textPosition, setTextPosition] = useState("both")
  const [textColor, setTextColor] = useState("text-white")
  const [textStyle, setTextStyle] = useState("font-bold")
  const [textAnimation, setTextAnimation] = useState("")
  const [fontSize, setFontSize] = useState(24)
  const [showToolbar, setShowToolbar] = useState<boolean>(true)

  // Background state
  const [background, setBackground] = useState(backgroundPatterns[0].value)

  // Layers state
  const [layers, setLayers] = useState<MemeLayer[]>([])
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null)
  const [nextLayerId, setNextLayerId] = useState(1)

  // Paint state
  const [showPaintMode, setShowPaintMode] = useState(false)
  const [paintLayerDataUrl, setPaintLayerDataUrl] = useState<string | null>(null)
  const [directPaintMode, setDirectPaintMode] = useState(false)

  // Emoji state
  const [showEmojiMode, setShowEmojiMode] = useState(false)
  const [emojiStamps, setEmojiStamps] = useState<EmojiStamp[]>([])
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

  // UI state
  const [activeTab, setActiveTab] = useState<ToolTab>("text")
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Refs
  const memePreviewRef = useRef<HTMLDivElement>(null)
  const paintCanvasRef = useRef<HTMLCanvasElement>(null)

  // Initialize with a random meme template
  useEffect(() => {
    generateRandomMeme()

    // Mobile toolbar visibility
    if (isMobile) {
      setShowToolbar(false)
    } else {
      setShowToolbar(true)
    }
  }, [isMobile])

  // Generate a random meme
  const generateRandomMeme = () => {
    const randomTemplate = randomMemeTemplates[Math.floor(Math.random() * randomMemeTemplates.length)]

    // Clear existing layers
    setLayers([])
    setEmojiStamps([])

    // Set text
    setTopText(randomTemplate.topText)
    setBottomText(randomTemplate.bottomText)
    setTextPosition("both")
    setTextColor(randomTemplate.textColor)
    setTextStyle(randomTemplate.textStyle)
    setTextAnimation(randomTemplate.textAnimation)

    // Set background
    setBackground(randomTemplate.background)

    // Add image layer
    const imageObj = {
      src: randomTemplate.image,
      width: 400,
      height: 400,
    }
    addLayer(imageObj)
  }

  // Add a new layer
  const addLayer = (imageData: any, type: "image" | "paint" = "image") => {
    const newLayer: MemeLayer = {
      id: `layer-${nextLayerId}`,
      name: type === "image" ? `Image ${nextLayerId}` : `Paint ${nextLayerId}`,
      type: type,
      visible: true,
      zIndex: layers.length,
      opacity: 1,
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      filter: "filter-none",
    }

    if (type === "image") {
      newLayer.src = imageData.src
    } else if (type === "paint") {
      newLayer.dataUrl = imageData
    }

    setLayers([...layers, newLayer])
    setSelectedLayerId(newLayer.id)
    setNextLayerId(nextLayerId + 1)
  }

  // Update layer
  const updateLayer = (id: string, property: string, value: any) => {
    setLayers(
      layers.map((layer) => {
        if (layer.id === id) {
          return { ...layer, [property]: value }
        }
        return layer
      }),
    )
  }

  // Toggle layer visibility
  const toggleLayerVisibility = (id: string) => {
    setLayers(
      layers.map((layer) => {
        if (layer.id === id) {
          return { ...layer, visible: !layer.visible }
        }
        return layer
      }),
    )
  }

  // Delete layer
  const deleteLayer = (id: string) => {
    setLayers(layers.filter((layer) => layer.id !== id))
    setSelectedLayerId(null)
  }

  // Bring layer forward
  const bringLayerForward = (id: string) => {
    setLayers(
      layers
        .map((layer) => {
          if (layer.id === id && layer.zIndex < layers.length - 1) {
            return { ...layer, zIndex: layer.zIndex + 1 }
          }
          return layer
        })
        .sort((a, b) => a.zIndex - b.zIndex),
    )
  }

  // Send layer backward
  const sendLayerBackward = (id: string) => {
    setLayers(
      layers
        .map((layer) => {
          if (layer.id === id && layer.zIndex > 0) {
            return { ...layer, zIndex: layer.zIndex - 1 }
          }
          return layer
        })
        .sort((a, b) => a.zIndex - b.zIndex),
    )
  }

  // Add emoji stamp
  const addEmojiStamp = (emoji: string, x: number, y: number) => {
    const newStamp: EmojiStamp = {
      id: `emoji-${Date.now()}`,
      emoji: emoji,
      x: x,
      y: y,
      scale: 1,
      rotation: 0,
    }
    setEmojiStamps([...emojiStamps, newStamp])
  }

  // Delete emoji stamp
  const deleteEmojiStamp = (id: string) => {
    setEmojiStamps(emojiStamps.filter((stamp) => stamp.id !== id))
  }

  // Reset meme
  const resetMeme = () => {
    setTopText("")
    setBottomText("")
    setTextPosition("both")
    setTextColor("text-white")
    setTextStyle("font-bold")
    setTextAnimation("")
    setFontSize(24)
    setBackground(backgroundPatterns[0].value)
    setLayers([])
    setSelectedLayerId(null)
    setNextLayerId(1)
    setShowPaintMode(false)
    setPaintLayerDataUrl(null)
    setShowEmojiMode(false)
    setEmojiStamps([])
    setActiveTab("text")
    setSavedImageUrl(null)
    setIsGenerating(false)
  }

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji)

    // If we're in the meme preview, add the emoji as a stamp
    if (memePreviewRef.current) {
      const rect = memePreviewRef.current.getBoundingClientRect()
      const x = 50 // Center X position as percentage
      const y = 50 // Center Y position as percentage
      addEmojiStamp(emoji, x, y)
    }
  }

  // Generate meme image
  const generateMeme = async () => {
    setIsGenerating(true)
    try {
      if (!memePreviewRef.current) {
        console.error("Meme preview ref is null")
        return
      }

      const canvas = await html2canvas(memePreviewRef.current, {
        useCORS: true, // Enable CORS to load images from different domains
        allowTaint: true, // Allow cross-origin images even if they taint the canvas
        scale: 2, // Higher scale for better quality
      })

      const dataURL = canvas.toDataURL("image/png")
      setSavedImageUrl(dataURL)
    } catch (error) {
      console.error("Error generating meme:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle paint save
  const handlePaintSave = (dataUrl: string) => {
    // Create a new layer with the painted content
    addLayer(dataUrl, "paint")
    setShowPaintMode(false)
    setPaintLayerDataUrl(null)
  }

  // Toggle toolbar visibility for mobile
  const toggleToolbar = () => {
    setShowToolbar(!showToolbar)
  }

  // Start direct painting on the meme
  const startDirectPainting = () => {
    setDirectPaintMode(true)
    // Capture current meme state as base image
    if (memePreviewRef.current) {
      html2canvas(memePreviewRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 1,
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png")
        setPaintLayerDataUrl(dataUrl)
      })
    }
  }

  return (
    <div className="bg-cosmic-dark/40 backdrop-blur-sm p-3 md:p-6 rounded-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
      <h2 className="text-2xl md:text-3xl font-comic font-bold mb-4 md:mb-6 cosmic-text text-center">
        $PURPL Meme Generator
      </h2>

      {/* Random meme button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={generateRandomMeme}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
        >
          <Wand2 size={18} />
          Random Meme
        </button>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Meme Preview - Always first on mobile */}
        <div className="order-1">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-purpl-light">Meme Preview</h3>
            <div
              ref={memePreviewRef}
              id="meme-preview"
              className={`relative ${background} rounded-lg overflow-hidden aspect-square flex items-center justify-center`}
              style={{
                width: isMobile ? "min(calc(100vw - 2rem), 500px)" : "100%",
                height: isMobile ? "min(calc(100vw - 2rem), 500px)" : undefined,
              }}
            >
              {/* Render layers */}
              {layers.map(
                (layer) =>
                  layer.visible && (
                    <div
                      key={layer.id}
                      className={`absolute ${layer.filter}`}
                      style={{
                        opacity: layer.opacity,
                        transform: `translate(-50%, -50%) scale(${layer.scale}) rotate(${layer.rotation}deg)`,
                        left: `calc(50% + ${layer.x}px)`,
                        top: `calc(50% + ${layer.y}px)`,
                        zIndex: layer.zIndex,
                      }}
                    >
                      {layer.type === "image" && layer.src && (
                        <img
                          src={layer.src || "/placeholder.svg"}
                          alt={layer.name}
                          className="max-w-full max-h-full object-contain"
                          crossOrigin="anonymous"
                        />
                      )}
                      {layer.type === "paint" && layer.dataUrl && (
                        <img
                          src={layer.dataUrl || "/placeholder.svg"}
                          alt={layer.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      )}
                    </div>
                  ),
              )}

              {/* Emoji stamps */}
              {emojiStamps.map((stamp) => (
                <div
                  key={stamp.id}
                  className="absolute"
                  style={{
                    left: `${stamp.x}%`,
                    top: `${stamp.y}%`,
                    transform: `translate(-50%, -50%) scale(${stamp.scale}) rotate(${stamp.rotation}deg)`,
                    fontSize: "2rem",
                    zIndex: 100,
                  }}
                >
                  {stamp.emoji}
                </div>
              ))}

              {/* Text overlays */}
              {(textPosition === "top" || textPosition === "both") && topText && (
                <div className="absolute top-4 left-0 right-0 text-center z-50">
                  <h3
                    className={`text-2xl ${textStyle} ${textColor} ${textAnimation} bg-black/50 py-2 px-4 inline-block rounded-full`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {topText}
                  </h3>
                </div>
              )}

              {(textPosition === "bottom" || textPosition === "both") && bottomText && (
                <div className="absolute bottom-4 left-0 right-0 text-center z-50">
                  <h3
                    className={`text-2xl ${textStyle} ${textColor} ${textAnimation} bg-black/50 py-2 px-4 inline-block rounded-full`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {bottomText}
                  </h3>
                </div>
              )}

              {textPosition === "middle" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50">
                  <h3
                    className={`text-2xl ${textStyle} ${textColor} ${textAnimation} bg-black/50 py-2 px-4 inline-block rounded-full mb-2`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {topText}
                  </h3>
                  <h3
                    className={`text-2xl ${textStyle} ${textColor} ${textAnimation} bg-black/50 py-2 px-4 inline-block rounded-full`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {bottomText}
                  </h3>
                </div>
              )}
            </div>
          </div>

          {/* Mobile toolbar toggle button */}
          {isMobile && (
            <div className="flex justify-center mb-4">
              <button
                onClick={toggleToolbar}
                className="px-4 py-2 bg-gradient-to-r from-purpl to-cosmic rounded-full text-white font-bold"
              >
                {showToolbar ? "Hide Tools" : "Show Tools"}
              </button>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={generateMeme}
              disabled={isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-purpl to-cosmic rounded-full text-white font-bold flex items-center gap-2"
            >
              <Save size={18} />
              {isGenerating ? "Generating..." : "Save Meme"}
            </button>

            <button
              onClick={resetMeme}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white font-bold"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Controls */}
        {showToolbar && (
          <div className="order-1 md:order-2">
            <div className="bg-cosmic-dark/70 rounded-lg p-4 mb-4">
              <div className="flex border-b border-purpl mb-4 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveTab("text")}
                  className={`px-3 py-2 rounded-t-lg flex items-center gap-1 ${
                    activeTab === "text" ? "bg-purpl text-white" : "bg-cosmic-dark/50 text-white/80"
                  }`}
                >
                  <Text size={16} /> Text
                </button>
                <button
                  onClick={() => setActiveTab("layers")}
                  className={`px-3 py-2 rounded-t-lg flex items-center gap-1 ${
                    activeTab === "layers" ? "bg-purpl text-white" : "bg-cosmic-dark/50 text-white/80"
                  }`}
                >
                  <ImageIcon size={16} /> Layers
                </button>
                <button
                  onClick={() => setActiveTab("emojis")}
                  className={`px-3 py-2 rounded-t-lg flex items-center gap-1 ${
                    activeTab === "emojis" ? "bg-purpl text-white" : "bg-cosmic-dark/50 text-white/80"
                  }`}
                >
                  <Smile size={16} /> Emojis
                </button>
                <button
                  onClick={() => setActiveTab("paint")}
                  className={`px-3 py-2 rounded-t-lg flex items-center gap-1 ${
                    activeTab === "paint" ? "bg-purpl text-white" : "bg-cosmic-dark/50 text-white/80"
                  }`}
                >
                  <Paintbrush size={16} /> Paint
                </button>
                <button
                  onClick={() => setActiveTab("effects")}
                  className={`px-3 py-2 rounded-t-lg flex items-center gap-1 ${
                    activeTab === "effects" ? "bg-purpl text-white" : "bg-cosmic-dark/50 text-white/80"
                  }`}
                >
                  <Sliders size={16} /> Effects
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-3 py-2 rounded-t-lg flex items-center gap-1 ${
                    activeTab === "settings" ? "bg-purpl text-white" : "bg-cosmic-dark/50 text-white/80"
                  }`}
                >
                  <Settings size={16} /> Settings
                </button>
              </div>

              <div className="max-h-[500px] overflow-y-auto pr-2">
                {activeTab === "text" && (
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-purpl-light mb-1 md:mb-2 text-sm md:text-base">Top Text:</label>
                      <input
                        type="text"
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                        placeholder="Top Text"
                        className="w-full p-2 bg-cosmic-dark/50 border border-purpl rounded text-white text-sm md:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-purpl-light mb-1 md:mb-2 text-sm md:text-base">Bottom Text:</label>
                      <input
                        type="text"
                        value={bottomText}
                        onChange={(e) => setBottomText(e.target.value)}
                        placeholder="Bottom Text"
                        className="w-full p-2 bg-cosmic-dark/50 border border-purpl rounded text-white text-sm md:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-purpl-light mb-1 md:mb-2 text-sm md:text-base">Text Position:</label>
                      <div className="grid grid-cols-2 gap-1 md:gap-2 text-sm md:text-base">
                        {textPositions.map((position) => (
                          <label key={position.value} className="flex items-center">
                            <input
                              type="radio"
                              name="textPosition"
                              value={position.value}
                              checked={textPosition === position.value}
                              onChange={(e) => setTextPosition(e.target.value)}
                              className="mr-1"
                            />
                            <span>{position.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-purpl-light mb-1 md:mb-2 text-sm md:text-base">Text Color:</label>
                      <div className="grid grid-cols-3 md:grid-cols-2 gap-1 md:gap-2 text-sm md:text-base">
                        {textColors.map((color) => (
                          <label key={color.name} className="flex items-center">
                            <input
                              type="radio"
                              name="textColor"
                              value={color.value}
                              checked={textColor === color.value}
                              onChange={(e) => setTextColor(e.target.value)}
                              className="mr-1"
                            />
                            <span className={color.value}>{color.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-purpl-light mb-1 md:mb-2 text-sm md:text-base">Font Size:</label>
                      <input
                        type="range"
                        min="16"
                        max="48"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="text-center text-sm md:text-base">{fontSize}px</div>
                    </div>
                  </div>
                )}

                {activeTab === "layers" && (
                  <div>
                    <h3 className="text-base md:text-lg font-bold mb-2 text-purpl-light">Image Layers</h3>
                    <div className="grid grid-cols-3 gap-1 md:gap-2 mb-3 md:mb-4">
                      {baseImages.slice(0, isMobile ? 6 : 6).map((image) => (
                        <div
                          key={image.id}
                          className="bg-cosmic-dark/50 p-1 md:p-2 rounded cursor-pointer hover:bg-purpl/30"
                          onClick={() => addLayer(image)}
                        >
                          <img
                            src={image.src || "/placeholder.svg"}
                            alt={image.name}
                            className="w-full h-14 md:h-20 object-contain mb-1"
                            crossOrigin="anonymous"
                          />
                          <p className="text-xs text-center truncate">{image.name}</p>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-base md:text-lg font-bold mb-2 text-purpl-light">Layer Controls</h3>
                    {layers.length === 0 ? (
                      <p className="text-xs md:text-sm text-gray-400">
                        No layers yet. Add images or paint to create layers!
                      </p>
                    ) : (
                      <div className="space-y-1 md:space-y-2">
                        {layers.map((layer) => (
                          <div
                            key={layer.id}
                            className={`p-1 md:p-2 rounded cursor-pointer ${
                              selectedLayerId === layer.id ? "bg-purpl/30 border border-purpl" : "bg-cosmic-dark/30"
                            }`}
                            onClick={() => setSelectedLayerId(layer.id)}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm md:text-base truncate">{layer.name}</span>
                              <div className="flex gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleLayerVisibility(layer.id)
                                  }}
                                  className="p-1 hover:bg-purpl/30 rounded text-xs md:text-sm"
                                >
                                  {layer.visible ? (
                                    <Eye size={isMobile ? 14 : 16} />
                                  ) : (
                                    <EyeOff size={isMobile ? 14 : 16} />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteLayer(layer.id)
                                  }}
                                  className="p-1 hover:bg-red-500/30 rounded text-xs md:text-sm"
                                >
                                  <X size={isMobile ? 14 : 16} />
                                </button>
                              </div>
                            </div>
                            {selectedLayerId === layer.id && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    bringLayerForward(layer.id)
                                  }}
                                  className="p-1 bg-cosmic-dark/50 hover:bg-purpl/30 rounded text-xs"
                                  title="Bring Forward"
                                >
                                  <ArrowUp size={12} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    sendLayerBackward(layer.id)
                                  }}
                                  className="p-1 bg-cosmic-dark/50 hover:bg-purpl/30 rounded text-xs"
                                  title="Send Backward"
                                >
                                  <ArrowDown size={12} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const layerToUpdate = layers.find((l) => l.id === layer.id)
                                    if (layerToUpdate) {
                                      updateLayer(layer.id, "scale", layerToUpdate.scale + 0.1)
                                    }
                                  }}
                                  className="p-1 bg-cosmic-dark/50 hover:bg-purpl/30 rounded text-xs"
                                  title="Scale Up"
                                >
                                  +
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const layerToUpdate = layers.find((l) => l.id === layer.id)
                                    if (layerToUpdate && layerToUpdate.scale > 0.2) {
                                      updateLayer(layer.id, "scale", layerToUpdate.scale - 0.1)
                                    }
                                  }}
                                  className="p-1 bg-cosmic-dark/50 hover:bg-purpl/30 rounded text-xs"
                                  title="Scale Down"
                                >
                                  -
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const layerToUpdate = layers.find((l) => l.id === layer.id)
                                    if (layerToUpdate) {
                                      updateLayer(layer.id, "rotation", (layerToUpdate.rotation + 15) % 360)
                                    }
                                  }}
                                  className="p-1 bg-cosmic-dark/50 hover:bg-purpl/30 rounded text-xs"
                                  title="Rotate"
                                >
                                  ↻
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "emojis" && (
                  <div>
                    <h3 className="text-base md:text-lg font-bold mb-2 text-purpl-light">Add Emojis</h3>
                    <div className="mb-4">
                      <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={() => {}} />
                    </div>

                    {emojiStamps.length > 0 && (
                      <div>
                        <h4 className="text-sm md:text-base font-bold mb-1 text-purpl-light">Current Emojis</h4>
                        <div className="flex flex-wrap gap-2">
                          {emojiStamps.map((stamp) => (
                            <div
                              key={stamp.id}
                              className="p-2 bg-cosmic-dark/50 rounded flex items-center justify-between"
                            >
                              <span className="text-xl">{stamp.emoji}</span>
                              <button
                                onClick={() => deleteEmojiStamp(stamp.id)}
                                className="ml-2 p-1 hover:bg-red-500/30 rounded"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "paint" && (
                  <div>
                    <h3 className="text-base md:text-lg font-bold mb-2 text-purpl-light">Paint Tool</h3>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => setShowPaintMode(true)}
                        className="w-full p-2 bg-gradient-to-r from-purpl to-cosmic rounded text-white font-bold"
                      >
                        Open Paint Tool
                      </button>

                      <button
                        onClick={startDirectPainting}
                        className="w-full p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded text-white font-bold"
                      >
                        Paint Directly on Meme
                      </button>
                    </div>

                    {showPaintMode && (
                      <div className="relative mt-4">
                        <button
                          onClick={() => setShowPaintMode(false)}
                          className="absolute top-2 right-2 z-10 p-1 bg-red-500 rounded-full text-white"
                        >
                          <X size={16} />
                        </button>
                        <div className="mt-2 border-2 border-purpl rounded overflow-hidden">
                          <MSPaint
                            width={isMobile ? 300 : 400}
                            height={isMobile ? 300 : 400}
                            onSave={handlePaintSave}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "effects" && (
                  <div>
                    <h3 className="text-base md:text-lg font-bold mb-2 text-purpl-light">Background</h3>
                    <div className="grid grid-cols-2 gap-1 md:gap-2 mb-3 md:mb-4 text-sm md:text-base">
                      {backgroundPatterns.slice(0, 6).map((pattern) => (
                        <label key={pattern.name} className="flex items-center">
                          <input
                            type="radio"
                            name="background"
                            value={pattern.value}
                            checked={background === pattern.value}
                            onChange={(e) => setBackground(e.target.value)}
                            className="mr-1"
                          />
                          <span className="text-sm md:text-base">{pattern.name}</span>
                        </label>
                      ))}
                    </div>

                    {selectedLayerId && (
                      <div>
                        <h3 className="text-base md:text-lg font-bold mb-2 text-purpl-light">Layer Effects</h3>
                        <div className="grid grid-cols-2 gap-1 md:gap-2 mb-3 md:mb-4 text-sm md:text-base">
                          {imageFilters.slice(0, 6).map((filter) => (
                            <label key={filter.name} className="flex items-center">
                              <input
                                type="radio"
                                name="filter"
                                value={filter.value}
                                checked={layers.find((l) => l.id === selectedLayerId)?.filter === filter.value}
                                onChange={(e) => updateLayer(selectedLayerId, "filter", e.target.value)}
                                className="mr-1"
                              />
                              <span className="text-sm md:text-base">{filter.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <h3 className="text-base md:text-lg font-bold mb-2 text-purpl-light">Meme Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-purpl-light mb-1 text-sm md:text-base">Quick Text Templates</label>
                        <select
                          className="w-full p-2 bg-cosmic-dark/50 border border-purpl rounded text-white text-sm md:text-base"
                          onChange={(e) => {
                            const value = e.target.value
                            if (value) {
                              setTopText(value)
                            }
                          }}
                        >
                          <option value="">Select a template...</option>
                          {memeTexts.map((text, index) => (
                            <option key={index} value={text}>
                              {text}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-purpl-light mb-1 text-sm md:text-base">Text Style</label>
                        <select
                          className="w-full p-2 bg-cosmic-dark/50 border border-purpl rounded text-white text-sm md:text-base"
                          value={textStyle}
                          onChange={(e) => setTextStyle(e.target.value)}
                        >
                          {textStyles.map((style, index) => (
                            <option key={index} value={style.value}>
                              {style.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-purpl-light mb-1 text-sm md:text-base">Text Animation</label>
                        <select
                          className="w-full p-2 bg-cosmic-dark/50 border border-purpl rounded text-white text-sm md:text-base"
                          value={textAnimation}
                          onChange={(e) => setTextAnimation(e.target.value)}
                        >
                          <option value="">None</option>
                          {textAnimations.map((animation, index) => (
                            <option key={index} value={animation.value}>
                              {animation.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-friendly save buttons - always visible */}
      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={generateMeme}
          disabled={isGenerating}
          className="px-3 md:px-4 py-2 bg-gradient-to-r from-purpl to-cosmic rounded-full text-white font-bold flex items-center gap-2 text-sm md:text-base"
        >
          <Save size={isMobile ? 16 : 18} />
          {isGenerating ? "Generating..." : "Save Meme"}
        </button>

        <button
          onClick={resetMeme}
          className="px-3 md:px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white font-bold text-sm md:text-base"
        >
          Reset
        </button>
      </div>

      {/* Image saver modal */}
      {savedImageUrl && <ImageSaver imageUrl={savedImageUrl} onClose={() => setSavedImageUrl(null)} />}

      {/* Direct paint mode */}
      {directPaintMode && paintLayerDataUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-cosmic-dark/90 p-4 rounded-xl w-full max-w-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold cosmic-text">Paint on Your Meme</h3>
              <button onClick={() => setDirectPaintMode(false)} className="p-1 hover:bg-purpl/30 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="border-2 border-purpl rounded overflow-hidden">
              <MSPaint
                width={isMobile ? 300 : 400}
                height={isMobile ? 300 : 400}
                initialImage={paintLayerDataUrl}
                onSave={handlePaintSave}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
