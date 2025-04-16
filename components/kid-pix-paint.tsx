"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Paintbrush, Eraser, RotateCcw, Download, Stamp, Sparkles, Palette } from "lucide-react"

interface KidPixPaintProps {
  backgroundImage: string | null
  width: number
  height: number
  onSave: (dataUrl: string) => void
}

type Tool = "brush" | "eraser" | "stamp" | "sparkle" | "rainbow"

const STAMPS = [
  "🦄", // unicorn
  "🐆", // panther
  "🔥", // fire (phoenix)
  "💜", // purple heart
  "🚀", // rocket
  "✨", // sparkles
  "💎", // diamond
  "🌈", // rainbow
  "🧙", // wizard
  "👑", // crown
]

export default function KidPixPaint({ backgroundImage, width, height, onSave }: KidPixPaintProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<Tool>("brush")
  const [color, setColor] = useState("#9d4edd") // Default purple
  const [brushSize, setBrushSize] = useState(5)
  const [selectedStamp, setSelectedStamp] = useState(STAMPS[0])
  const [showStamps, setShowStamps] = useState(false)
  const [showColors, setShowColors] = useState(false)

  const lastPos = useRef({ x: 0, y: 0 })
  const ctx = useRef<CanvasRenderingContext2D | null>(null)

  // Colors for the KidPix-style palette
  const colors = [
    "#9d4edd", // purple
    "#ffd700", // gold
    "#ff3366", // pink
    "#33ccff", // blue
    "#66ff66", // green
    "#ff6633", // orange
    "#ffffff", // white
    "#000000", // black
    "#ff0000", // red
    "#ffff00", // yellow
  ]

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    const context = canvas.getContext("2d")
    if (!context) return

    ctx.current = context
    ctx.current.lineCap = "round"
    ctx.current.lineJoin = "round"

    // Draw background image if provided
    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        if (ctx.current) {
          ctx.current.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
      }
      img.src = backgroundImage
    }
  }, [backgroundImage, width, height])

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)

    const canvas = canvasRef.current
    if (!canvas || !ctx.current) return

    const rect = canvas.getBoundingClientRect()
    const x = e instanceof MouseEvent ? e.clientX - rect.left : e.touches[0].clientX - rect.left
    const y = e instanceof MouseEvent ? e.clientY - rect.top : e.touches[0].clientY - rect.top

    lastPos.current = { x, y }

    if (tool === "stamp") {
      drawStamp(x, y)
    } else if (tool === "sparkle") {
      drawSparkle(x, y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e instanceof MouseEvent ? e.clientX - rect.left : e.touches[0].clientX - rect.left
    const y = e instanceof MouseEvent ? e.clientY - rect.top : e.touches[0].clientY - rect.top

    if (tool === "brush") {
      ctx.current.strokeStyle = color
      ctx.current.lineWidth = brushSize
      ctx.current.beginPath()
      ctx.current.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.current.lineTo(x, y)
      ctx.current.stroke()
    } else if (tool === "eraser") {
      ctx.current.strokeStyle = "rgba(0,0,0,0)"
      ctx.current.lineWidth = brushSize * 2
      ctx.current.globalCompositeOperation = "destination-out"
      ctx.current.beginPath()
      ctx.current.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.current.lineTo(x, y)
      ctx.current.stroke()
      ctx.current.globalCompositeOperation = "source-over"
    } else if (tool === "rainbow") {
      const gradient = ctx.current.createLinearGradient(lastPos.current.x, lastPos.current.y, x, y)
      gradient.addColorStop(0, "red")
      gradient.addColorStop(0.17, "orange")
      gradient.addColorStop(0.33, "yellow")
      gradient.addColorStop(0.5, "green")
      gradient.addColorStop(0.67, "blue")
      gradient.addColorStop(0.83, "indigo")
      gradient.addColorStop(1, "violet")

      ctx.current.strokeStyle = gradient
      ctx.current.lineWidth = brushSize * 1.5
      ctx.current.beginPath()
      ctx.current.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.current.lineTo(x, y)
      ctx.current.stroke()
    }

    lastPos.current = { x, y }
  }

  const endDrawing = () => {
    setIsDrawing(false)
  }

  const drawStamp = (x: number, y: number) => {
    if (!ctx.current) return

    ctx.current.font = `${brushSize * 5}px Arial`
    ctx.current.textAlign = "center"
    ctx.current.textBaseline = "middle"
    ctx.current.fillText(selectedStamp, x, y)
  }

  const drawSparkle = (x: number, y: number) => {
    if (!ctx.current) return

    // Draw a sparkle effect
    const size = brushSize * 3
    const colors = ["#ffffff", "#ffff00", "#ffd700"]

    for (let i = 0; i < 8; i++) {
      const angle = ((Math.PI * 2) / 8) * i
      const length = size + Math.random() * size

      ctx.current.beginPath()
      ctx.current.moveTo(x, y)
      ctx.current.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
      ctx.current.strokeStyle = colors[Math.floor(Math.random() * colors.length)]
      ctx.current.lineWidth = brushSize / 2
      ctx.current.stroke()
    }

    // Draw center dot
    ctx.current.beginPath()
    ctx.current.arc(x, y, brushSize, 0, Math.PI * 2)
    ctx.current.fillStyle = "#ffffff"
    ctx.current.fill()
  }

  const clearCanvas = () => {
    if (!ctx.current || !canvasRef.current) return

    ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Redraw background if available
    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        if (ctx.current && canvasRef.current) {
          ctx.current.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      }
      img.src = backgroundImage
    }
  }

  const saveCanvas = () => {
    if (!canvasRef.current) return

    try {
      // Get the canvas data with high quality
      const dataUrl = canvasRef.current.toDataURL("image/png", 1.0)

      if (onSave) {
        // If there's a callback, use it
        onSave(dataUrl)
      } else {
        // Otherwise download directly
        const link = document.createElement("a")
        link.download = "purpl-meme.png"
        link.href = dataUrl
        document.body.appendChild(link)
        link.click()

        // Clean up
        setTimeout(() => {
          document.body.removeChild(link)
        }, 100)
      }
    } catch (error) {
      console.error("Error saving canvas:", error)
      alert("There was an error saving your image. Please try again.")
    }
  }

  const downloadCanvas = () => {
    if (!canvasRef.current) return

    const dataUrl = canvasRef.current.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "purpl-meme.png"
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 border-4 border-purpl rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
          className="touch-none"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => setTool("brush")}
          className={`p-2 rounded-lg ${tool === "brush" ? "bg-purpl text-white" : "bg-cosmic-dark/50"}`}
          title="Brush"
        >
          <Paintbrush size={20} />
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={`p-2 rounded-lg ${tool === "eraser" ? "bg-purpl text-white" : "bg-cosmic-dark/50"}`}
          title="Eraser"
        >
          <Eraser size={20} />
        </button>
        <button
          onClick={() => {
            setTool("stamp")
            setShowStamps(!showStamps)
            setShowColors(false)
          }}
          className={`p-2 rounded-lg ${tool === "stamp" ? "bg-purpl text-white" : "bg-cosmic-dark/50"}`}
          title="Stamp"
        >
          <Stamp size={20} />
        </button>
        <button
          onClick={() => setTool("sparkle")}
          className={`p-2 rounded-lg ${tool === "sparkle" ? "bg-purpl text-white" : "bg-cosmic-dark/50"}`}
          title="Sparkle"
        >
          <Sparkles size={20} />
        </button>
        <button
          onClick={() => setTool("rainbow")}
          className={`p-2 rounded-lg ${tool === "rainbow" ? "bg-purpl text-white" : "bg-cosmic-dark/50"}`}
          title="Rainbow Brush"
        >
          <div className="w-5 h-5 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-full"></div>
        </button>
        <button
          onClick={() => {
            setShowColors(!showColors)
            setShowStamps(false)
          }}
          className="p-2 rounded-lg bg-cosmic-dark/50"
          title="Color Picker"
        >
          <Palette size={20} />
        </button>
        <button onClick={clearCanvas} className="p-2 rounded-lg bg-cosmic-dark/50" title="Clear Canvas">
          <RotateCcw size={20} />
        </button>
        <button onClick={downloadCanvas} className="p-2 rounded-lg bg-cosmic-dark/50" title="Download">
          <Download size={20} />
        </button>
      </div>

      {/* Brush size slider */}
      <div className="flex items-center gap-2 mb-4 w-full max-w-xs">
        <span className="text-xs">Size:</span>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
          className="w-full"
        />
        <span className="text-xs">{brushSize}</span>
      </div>

      {/* Color picker */}
      {showColors && (
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-cosmic-dark/70 rounded-lg">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full ${color === c ? "ring-2 ring-white" : ""}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      )}

      {/* Stamp picker */}
      {showStamps && (
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-cosmic-dark/70 rounded-lg">
          {STAMPS.map((stamp) => (
            <button
              key={stamp}
              onClick={() => setSelectedStamp(stamp)}
              className={`w-8 h-8 flex items-center justify-center text-lg ${
                selectedStamp === stamp ? "bg-purpl rounded-full" : ""
              }`}
            >
              {stamp}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={saveCanvas}
        className="px-4 py-2 bg-gradient-to-r from-purpl to-cosmic rounded-full text-white font-bold"
      >
        Save Masterpiece
      </button>
    </div>
  )
}
