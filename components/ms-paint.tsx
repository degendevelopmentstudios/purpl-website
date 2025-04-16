"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface MSPaintProps {
  width: number
  height: number
  onSave?: (dataUrl: string) => void
  className?: string
  onClose?: () => void
  baseImage?: string | null
}

type Tool = "pencil" | "brush" | "eraser" | "fill" | "text" | "spray" | "line" | "rectangle" | "circle"
type BrushSize = "small" | "medium" | "large"

export default function MSPaint({ width, height, onSave, className = "", onClose, baseImage = null }: MSPaintProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<Tool>("pencil")
  const [color, setColor] = useState("#8A2BE2") // Default to purple
  const [brushSize, setBrushSize] = useState<BrushSize>("medium")
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [showTools, setShowTools] = useState(true)
  const [toolsAnimating, setToolsAnimating] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [minimized, setMinimized] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showToolsPanel, setShowToolsPanel] = useState(true)
  const [showEffectsPanel, setShowEffectsPanel] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [isAddingText, setIsAddingText] = useState(false)
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
  const [toolsVisible, setToolsVisible] = useState(true)

  const brushSizes = {
    small: 2,
    medium: 5,
    large: 10,
  }

  // Colors palette - PURPL themed
  const colorPalette = [
    "#8A2BE2", // Purple
    "#FFD700", // Gold
    "#FF1493", // Deep Pink
    "#00BFFF", // Deep Sky Blue
    "#32CD32", // Lime Green
    "#FF4500", // Orange Red
    "#FFFFFF", // White
    "#000000", // Black
  ]

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayCanvasRef.current
    if (!canvas || !overlay) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height
    overlay.width = width
    overlay.height = height

    // Get context and set default styles
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Fill with white background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    // Save initial state to history
    const initialState = canvas.toDataURL()
    setHistory([initialState])
    setHistoryIndex(0)
  }, [width, height])

  // Load base image if provided
  useEffect(() => {
    const canvas = canvasRef.current
    if (baseImage && canvas) {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height)
        // Save state to history
        saveToHistory()
      }
      img.src = baseImage
    }
  }, [baseImage, width, height])

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setLastPosition({ x, y })

    // For fill tool, execute immediately
    if (tool === "fill") {
      fillArea(x, y)
      setIsDrawing(false)
    }

    // For text tool, set position and activate text input
    if (tool === "text") {
      setTextPosition({ x, y })
      setIsAddingText(true)
      return
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const overlay = overlayCanvasRef.current
    if (!canvas || !overlay) return

    const ctx = canvas.getContext("2d")
    const overlayCtx = overlay.getContext("2d")
    if (!ctx || !overlayCtx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Clear overlay for temporary drawing
    overlayCtx.clearRect(0, 0, width, height)

    switch (tool) {
      case "pencil":
        drawPencil(ctx, x, y)
        break
      case "brush":
        drawBrush(ctx, x, y)
        break
      case "eraser":
        erase(ctx, x, y)
        break
      case "spray":
        spray(ctx, x, y)
        break
      case "line":
        // Draw temporary line on overlay
        drawLine(overlayCtx, lastPosition.x, lastPosition.y, x, y)
        break
      case "rectangle":
        // Draw temporary rectangle on overlay
        drawRect(overlayCtx, lastPosition.x, lastPosition.y, x, y)
        break
      case "circle":
        // Draw temporary circle on overlay
        drawCircle(overlayCtx, lastPosition.x, lastPosition.y, x, y)
        break
      default:
        break
    }

    // Update last position for tools that need it
    if (["pencil", "brush", "eraser", "spray"].includes(tool)) {
      setLastPosition({ x, y })
    }
  }

  const endDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const overlay = overlayCanvasRef.current
    if (!canvas || !overlay) return

    const ctx = canvas.getContext("2d")
    const overlayCtx = overlay.getContext("2d")
    if (!ctx || !overlayCtx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Finalize shapes by drawing them on the main canvas
    switch (tool) {
      case "line":
        drawLine(ctx, lastPosition.x, lastPosition.y, x, y)
        break
      case "rectangle":
        drawRect(ctx, lastPosition.x, lastPosition.y, x, y)
        break
      case "circle":
        drawCircle(ctx, lastPosition.x, lastPosition.y, x, y)
        break
      default:
        break
    }

    // Clear the overlay
    overlayCtx.clearRect(0, 0, width, height)

    setIsDrawing(false)
    saveToHistory()
  }

  // Tool-specific drawing functions
  const drawPencil = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()
    ctx.moveTo(lastPosition.x, lastPosition.y)
    ctx.lineTo(x, y)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSizes[brushSize] / 2
    ctx.lineCap = "round"
    ctx.stroke()
  }

  const drawBrush = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()
    ctx.moveTo(lastPosition.x, lastPosition.y)
    ctx.lineTo(x, y)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSizes[brushSize]
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()
  }

  const erase = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()
    ctx.moveTo(lastPosition.x, lastPosition.y)
    ctx.lineTo(x, y)
    ctx.strokeStyle = "white"
    ctx.lineWidth = brushSizes[brushSize] * 2
    ctx.lineCap = "round"
    ctx.stroke()
  }

  const spray = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const density = brushSizes[brushSize] * 5
    const radius = brushSizes[brushSize] * 3

    for (let i = 0; i < density; i++) {
      const offsetX = Math.random() * 2 * radius - radius
      const offsetY = Math.random() * 2 * radius - radius

      // Only draw within the circle
      if (offsetX * offsetX + offsetY * offsetY <= radius * radius) {
        ctx.fillStyle = color
        ctx.fillRect(x + offsetX, y + offsetY, 1, 1)
      }
    }
  }

  const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSizes[brushSize]
    ctx.lineCap = "round"
    ctx.stroke()
  }

  const drawRect = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    const width = x2 - x1
    const height = y2 - y1

    ctx.beginPath()
    ctx.rect(x1, y1, width, height)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSizes[brushSize]
    ctx.stroke()
  }

  const drawCircle = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    const radiusX = Math.abs(x2 - x1) / 2
    const radiusY = Math.abs(y2 - y1) / 2
    const centerX = Math.min(x1, x2) + radiusX
    const centerY = Math.min(y1, y2) + radiusY

    ctx.beginPath()
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSizes[brushSize]
    ctx.stroke()
  }

  const fillArea = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get the pixel data at the clicked position
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Get the color of the clicked pixel
    const targetColor = getPixelColor(imageData, x, y)
    const fillColor = hexToRgb(color)

    // Don't fill if the target color is the same as the fill color
    if (colorsEqual(targetColor, fillColor)) return

    // Flood fill algorithm
    const pixelsToCheck = [{ x, y }]
    const width = canvas.width
    const height = canvas.height

    while (pixelsToCheck.length > 0) {
      const pixel = pixelsToCheck.pop()!
      const { x, y } = pixel

      // Skip if out of bounds
      if (x < 0 || y < 0 || x >= width || y >= height) continue

      // Get the current pixel color
      const currentColor = getPixelColor(imageData, x, y)

      // Skip if not the target color
      if (!colorsEqual(currentColor, targetColor)) continue

      // Set the pixel to the fill color
      setPixelColor(imageData, x, y, fillColor)

      // Add adjacent pixels to check
      pixelsToCheck.push({ x: x + 1, y })
      pixelsToCheck.push({ x: x - 1, y })
      pixelsToCheck.push({ x, y: y + 1 })
      pixelsToCheck.push({ x, y: y - 1 })
    }

    // Update the canvas with the filled area
    ctx.putImageData(imageData, 0, 0)
  }

  // Helper functions for fill tool
  const getPixelColor = (imageData: ImageData, x: number, y: number) => {
    const index = (y * imageData.width + x) * 4
    return {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3],
    }
  }

  const setPixelColor = (
    imageData: ImageData,
    x: number,
    y: number,
    color: { r: number; g: number; b: number; a: number },
  ) => {
    const index = (y * imageData.width + x) * 4
    imageData.data[index] = color.r
    imageData.data[index + 1] = color.g
    imageData.data[index + 2] = color.b
    imageData.data[index + 3] = color.a
  }

  const colorsEqual = (
    color1: { r: number; g: number; b: number; a: number },
    color2: { r: number; g: number; b: number; a: number },
  ) => {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
          a: 255,
        }
      : { r: 0, g: 0, b: 0, a: 255 }
  }

  // Save current state to history
  const saveToHistory = () => {
    if (canvasRef.current) {
      const newState = canvasRef.current.toDataURL()

      // If we're not at the end of the history, truncate it
      if (historyIndex < history.length - 1) {
        setHistory(history.slice(0, historyIndex + 1))
      }

      setHistory([...history.slice(0, historyIndex + 1), newState])
      setHistoryIndex(historyIndex + 1)
    }
  }

  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)

      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = history[newIndex]
    }
  }

  // Redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)

      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = history[newIndex]
    }
  }

  // Save the canvas as an image
  const saveCanvas = () => {
    if (!canvasRef.current || !onSave) return
    const dataUrl = canvasRef.current.toDataURL("image/png")
    onSave(dataUrl)
  }

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
    saveToHistory()
  }

  // Add text to canvas
  const addTextToCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx || !textInput) return

    ctx.font = `${brushSizes[brushSize] * 3}px Arial`
    ctx.fillStyle = color
    ctx.fillText(textInput, textPosition.x, textPosition.y)

    setTextInput("")
    setIsAddingText(false)
    saveToHistory()
  }

  // Toggle tools visibility with animation
  const toggleTools = () => {
    if (toolsAnimating) return

    setToolsAnimating(true)
    setTimeout(() => {
      setShowTools(!showTools)
      setTimeout(() => {
        setToolsAnimating(false)
      }, 500)
    }, 100)
  }

  // Toggle tools visibility with genie effect
  const toggleToolsVisibility = () => {
    setToolsVisible(!toolsVisible)
  }

  return (
    <div className={`relative ${className}`}>
      {/* MS Paint style toolbar */}
      <div
        className={`absolute left-0 top-0 bg-gray-200 border-2 border-gray-400 rounded-t-lg p-2 transition-all duration-500 ease-in-out ${
          showTools ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        } ${toolsAnimating ? "scale-y-0 origin-top" : "scale-y-100"}`}
        style={{ width: width, zIndex: 20 }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {/* Tool buttons */}
          <div className="flex flex-wrap gap-1 border-2 border-gray-400 p-1 rounded bg-gray-100">
            <button
              className={`w-8 h-8 flex items-center justify-center ${tool === "pencil" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setTool("pencil")}
              title="Pencil"
            >
              <span className="text-xs">✏️</span>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center ${tool === "brush" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setTool("brush")}
              title="Brush"
            >
              <span className="text-xs">🖌️</span>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center ${tool === "eraser" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setTool("eraser")}
              title="Eraser"
            >
              <span className="text-xs">🧽</span>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center ${tool === "fill" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setTool("fill")}
              title="Fill"
            >
              <span className="text-xs">🪣</span>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center ${tool === "spray" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setTool("spray")}
              title="Spray"
            >
              <span className="text-xs">💨</span>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center ${tool === "line" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setTool("line")}
              title="Line"
            >
              <span className="text-xs">📏</span>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center ${tool === "rectangle" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setTool("rectangle")}
              title="Rectangle"
            >
              <span className="text-xs">⬜</span>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center ${tool === "circle" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setTool("circle")}
              title="Circle"
            >
              <span className="text-xs">⭕</span>
            </button>
          </div>

          {/* Brush size selector */}
          <div className="flex gap-1 border-2 border-gray-400 p-1 rounded bg-gray-100">
            <button
              className={`w-8 h-8 flex items-center justify-center ${brushSize === "small" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setBrushSize("small")}
              title="Small"
            >
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center ${brushSize === "medium" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setBrushSize("medium")}
              title="Medium"
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center ${brushSize === "large" ? "bg-purple-300" : "bg-white"} border border-gray-400 hover:bg-purple-200`}
              onClick={() => setBrushSize("large")}
              title="Large"
            >
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </button>
          </div>

          {/* Color palette */}
          <div className="flex flex-wrap gap-1 border-2 border-gray-400 p-1 rounded bg-gray-100">
            {colorPalette.map((paletteColor, index) => (
              <button
                key={index}
                className={`w-6 h-6 border ${color === paletteColor ? "border-black border-2" : "border-gray-400"}`}
                style={{ backgroundColor: paletteColor }}
                onClick={() => setColor(paletteColor)}
                title={paletteColor}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-1 border-2 border-gray-400 p-1 rounded bg-gray-100">
            <button
              className="px-2 py-1 bg-white border border-gray-400 hover:bg-purple-200 text-xs"
              onClick={clearCanvas}
              title="Clear"
            >
              Clear
            </button>
            <button
              className="px-2 py-1 bg-white border border-gray-400 hover:bg-purple-200 text-xs"
              onClick={saveCanvas}
              title="Save"
            >
              Save
            </button>
            <button
              onClick={handleUndo}
              className="px-2 py-1 bg-white border border-gray-400 hover:bg-purple-200 text-xs"
              title="Undo"
              disabled={historyIndex <= 0}
            >
              Undo
            </button>
            <button
              onClick={handleRedo}
              className="px-2 py-1 bg-white border border-gray-400 hover:bg-purple-200 text-xs"
              title="Redo"
              disabled={historyIndex >= history.length - 1}
            >
              Redo
            </button>
          </div>
        </div>
      </div>

      {/* Toggle button for tools */}
      <button
        className="absolute right-2 top-2 z-30 bg-purple-600 text-white px-2 py-1 rounded-full text-xs hover:bg-purple-700 transition-all"
        onClick={toggleTools}
      >
        {showTools ? "Hide Tools" : "Show Tools"}
      </button>

      {/* Canvas container */}
      <div className="relative" style={{ width, height }}>
        {/* Main canvas */}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="absolute top-0 left-0 border-2 border-gray-400 cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />

        {/* Overlay canvas for temporary shapes */}
        <canvas
          ref={overlayCanvasRef}
          width={width}
          height={height}
          className="absolute top-0 left-0 pointer-events-none"
        />
      </div>

      {/* PURPL branding */}
      <div className="absolute bottom-2 right-2 z-10 opacity-50">
        <div className="text-xs font-bold text-purple-800">PURPL Paint</div>
      </div>

      {/* Text input */}
      {isAddingText && (
        <div
          className="absolute"
          style={{
            top: textPosition.y,
            left: textPosition.x,
          }}
        >
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onBlur={addTextToCanvas}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTextToCanvas()
              }
            }}
            className="text-black text-sm p-0 m-0 border-none outline-none bg-transparent"
            autoFocus
          />
        </div>
      )}
    </div>
  )
}
