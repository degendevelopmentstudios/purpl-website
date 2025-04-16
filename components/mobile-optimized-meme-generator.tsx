"use client"

import { useState, useRef, useEffect } from "react"
import {
  Layers,
  ImageIcon,
  Palette,
  Download,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Text,
} from "lucide-react"
import { ImprovedMSPaint } from "./improved-ms-paint"
import { useMobile } from "@/hooks/use-mobile"
import ImageSaver from "./image-saver"

// Define types for our layers and state
interface Layer {
  id: string
  type: "image" | "text"
  content: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  zIndex: number
  visible: boolean
  filter: string
}

export const MobileOptimizedMemeGenerator = () => {
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState("templates")
  const [layers, setLayers] = useState<Layer[]>([])
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null)
  const [templates, setTemplates] = useState<string[]>([
    "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/mascot-transparent.png",
    "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/energy-ball.png",
    "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/flower-purpl.png",
    "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/atom-purple.png",
    "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/purple-galaxy.png",
    "https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeig7en6sgohdmxlnqpipcxcv4aivwup5p362waifczpplda6ne6kle/purple-unicorn.png",
  ])
  const [textInput, setTextInput] = useState("")
  const [textColor, setTextColor] = useState("#ffffff")
  const [textSize, setTextSize] = useState(24)
  const [textStroke, setTextStroke] = useState(2)
  const [textFont, setTextFont] = useState("Impact")
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 })
  const [scale, setScale] = useState(1)
  const [isPainting, setIsPainting] = useState(false)
  const [paintImage, setPaintImage] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0,
  })
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null)
  const [background, setBackground] = useState("bg-gradient-to-r from-purple-900 to-indigo-900")

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const memePreviewRef = useRef<HTMLDivElement>(null)

  // Selected layer getter
  const selectedLayer = selectedLayerId ? layers.find((layer) => layer.id === selectedLayerId) : null

  // Initialize canvas with a template
  useEffect(() => {
    if (templates.length > 0 && layers.length === 0) {
      addImageLayer(templates[0])
    }
  }, [templates])

  // Resize canvas based on container size for mobile
  useEffect(() => {
    if (containerRef.current && isMobile) {
      const containerWidth = containerRef.current.clientWidth
      const newScale = Math.min(1, containerWidth / canvasSize.width)
      setScale(newScale)
    }
  }, [canvasSize, isMobile])

  // Render canvas whenever layers change
  useEffect(() => {
    renderCanvas()
  }, [layers, scale])

  // Add image layer
  const addImageLayer = (imageUrl: string) => {
    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      type: "image",
      content: imageUrl,
      x: 0,
      y: 0,
      width: canvasSize.width,
      height: canvasSize.height,
      rotation: 0,
      opacity: 100,
      zIndex: layers.length,
      visible: true,
      filter: "",
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newLayer.id)
  }

  // Add text layer
  const addTextLayer = () => {
    if (!textInput.trim()) return

    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      type: "text",
      content: textInput,
      x: canvasSize.width / 2 - 100,
      y: canvasSize.height / 2,
      width: 200,
      height: 50,
      rotation: 0,
      opacity: 100,
      zIndex: layers.length,
      visible: true,
      filter: "",
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newLayer.id)
    setTextInput("")
  }

  // Update layer position
  const updateLayerPosition = (id: string, x: number, y: number) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, x, y } : layer)))
  }

  // Update layer property
  const updateLayerProperty = (id: string, property: keyof Layer, value: any) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, [property]: value } : layer)))
  }

  // Delete layer
  const deleteLayer = (id: string) => {
    setLayers(layers.filter((layer) => layer.id !== id))
    if (selectedLayerId === id) {
      setSelectedLayerId(null)
    }
  }

  // Move layer up in z-index
  const moveLayerUp = (id: string) => {
    const layerIndex = layers.findIndex((layer) => layer.id === id)
    if (layerIndex < layers.length - 1) {
      const newLayers = [...layers]
      const temp = newLayers[layerIndex].zIndex
      newLayers[layerIndex].zIndex = newLayers[layerIndex + 1].zIndex
      newLayers[layerIndex + 1].zIndex = temp
      setLayers(newLayers.sort((a, b) => a.zIndex - b.zIndex))
    }
  }

  // Move layer down in z-index
  const moveLayerDown = (id: string) => {
    const layerIndex = layers.findIndex((layer) => layer.id === id)
    if (layerIndex > 0) {
      const newLayers = [...layers]
      const temp = newLayers[layerIndex].zIndex
      newLayers[layerIndex].zIndex = newLayers[layerIndex - 1].zIndex
      newLayers[layerIndex - 1].zIndex = temp
      setLayers(newLayers.sort((a, b) => a.zIndex - b.zIndex))
    }
  }

  // Toggle layer visibility
  const toggleLayerVisibility = (id: string) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer)))
  }

  // Duplicate layer
  const duplicateLayer = (id: string) => {
    const layerToDuplicate = layers.find((layer) => layer.id === id)
    if (layerToDuplicate) {
      const newLayer = {
        ...layerToDuplicate,
        id: `layer-${Date.now()}`,
        x: layerToDuplicate.x + 20,
        y: layerToDuplicate.y + 20,
        zIndex: layers.length,
      }
      setLayers([...layers, newLayer])
      setSelectedLayerId(newLayer.id)
    }
  }

  // Apply filters to the selected layer
  const applyFilters = () => {
    if (selectedLayerId) {
      const filterString = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) hue-rotate(${filters.hue}deg) blur(${filters.blur}px)`
      updateLayerProperty(selectedLayerId, "filter", filterString)
    }
  }

  // Start painting mode
  const startPainting = () => {
    renderCanvas()
    const canvas = canvasRef.current
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png")
      setPaintImage(dataUrl)
      setIsPainting(true)
    }
  }

  // Finish painting and add as a new layer
  const finishPainting = (paintedImageData: string) => {
    if (paintedImageData) {
      const newLayer: Layer = {
        id: `layer-${Date.now()}`,
        type: "image",
        content: paintedImageData,
        x: 0,
        y: 0,
        width: canvasSize.width,
        height: canvasSize.height,
        rotation: 0,
        opacity: 100,
        zIndex: layers.length + 1, // Place on top of existing layers
        visible: true,
        filter: "",
      }
      setLayers([...layers, newLayer])
      setSelectedLayerId(newLayer.id)
    }
    setIsPainting(false)
    setPaintImage(null)
  }

  // Render canvas with all layers
  const renderCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sort layers by z-index
    const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex)

    // Draw each visible layer
    sortedLayers.forEach((layer) => {
      if (!layer.visible) return

      ctx.save()

      // Apply transformations
      ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2)
      ctx.rotate((layer.rotation * Math.PI) / 180)
      ctx.globalAlpha = layer.opacity / 100

      // Apply filter if any
      if (layer.filter) {
        ctx.filter = layer.filter
      }

      if (layer.type === "image") {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = layer.content

        if (img.complete) {
          ctx.drawImage(img, -layer.width / 2, -layer.height / 2, layer.width, layer.height)
        } else {
          img.onload = () => {
            ctx.drawImage(img, -layer.width / 2, -layer.height / 2, layer.width, layer.height)
          }
        }
      } else if (layer.type === "text") {
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = `${textSize}px ${textFont}`

        // Text stroke
        if (textStroke > 0) {
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = textStroke
          ctx.strokeText(layer.content, 0, 0)
        }

        // Text fill
        ctx.fillStyle = textColor
        ctx.fillText(layer.content, 0, 0)
      }

      ctx.restore()
    })
  }

  // Save the meme
  const saveMeme = () => {
    renderCanvas()
    const canvas = canvasRef.current
    if (canvas) {
      try {
        // Use higher quality settings for the image
        const dataUrl = canvas.toDataURL("image/png", 1.0)
        setSavedImageUrl(dataUrl)
      } catch (error) {
        console.error("Error saving meme:", error)
        // Don't destructure error, just log it

        // Fallback for any CORS issues
        try {
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.save()
            // Draw a background to ensure transparency is handled correctly
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            // Draw the canvas content
            ctx.drawImage(canvas, 0, 0)
            const fallbackDataUrl = canvas.toDataURL("image/png", 1.0)
            setSavedImageUrl(fallbackDataUrl)
            ctx.restore()
          }
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError)
          alert("Unable to save image. Please try a different browser or device.")
        }
      }
    }
  }

  // Background patterns
  const backgroundPatterns = [
    { name: "Purple Gradient", value: "bg-gradient-to-r from-purple-900 to-indigo-900" },
    { name: "Cosmic Blend", value: "bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900" },
    { name: "Dark Cosmic", value: "bg-gradient-to-tr from-purple-900 to-indigo-800" },
    { name: "Pink Blend", value: "bg-gradient-to-bl from-purple-800 via-pink-800 to-purple-900" },
  ]

  return (
    <div className="w-full max-w-full overflow-hidden bg-purple-50 rounded-lg shadow-lg">
      <div className="flex flex-col space-y-4 p-4">
        {/* Mobile-optimized tabs */}
        <div className="w-full">
          <div className="flex border-b border-purple-300 mb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("templates")}
              className={`px-3 py-2 flex flex-col items-center ${
                activeTab === "templates" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-600"
              }`}
            >
              <ImageIcon size={16} />
              <span className="text-xs">Templates</span>
            </button>
            <button
              onClick={() => setActiveTab("layers")}
              className={`px-3 py-2 flex flex-col items-center ${
                activeTab === "layers" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-600"
              }`}
            >
              <Layers size={16} />
              <span className="text-xs">Layers</span>
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`px-3 py-2 flex flex-col items-center ${
                activeTab === "text" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-600"
              }`}
            >
              <Text size={16} />
              <span className="text-xs">Text</span>
            </button>
            <button
              onClick={() => setActiveTab("paint")}
              className={`px-3 py-2 flex flex-col items-center ${
                activeTab === "paint" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-600"
              }`}
            >
              <Palette size={16} />
              <span className="text-xs">Paint</span>
            </button>
            <button
              onClick={() => setActiveTab("effects")}
              className={`px-3 py-2 flex flex-col items-center ${
                activeTab === "effects" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-600"
              }`}
            >
              <Sliders size={16} />
              <span className="text-xs">Effects</span>
            </button>
          </div>
        </div>

        {/* Canvas preview - always visible */}
        <div ref={containerRef} className="relative w-full flex justify-center mb-4">
          <div
            ref={memePreviewRef}
            className={`relative ${background} border border-gray-300 overflow-hidden rounded-lg flex items-center justify-center`}
            style={{
              width: isMobile ? "min(calc(100vw - 2rem), 400px)" : "400px",
              height: isMobile ? "min(calc(100vw - 2rem), 400px)" : "400px",
            }}
          >
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              className="absolute top-0 left-0"
              style={{
                width: "100%",
                height: "100%",
              }}
            />

            {/* Layer selection overlay */}
            {selectedLayerId && !isPainting && (
              <div
                className="absolute border-2 border-dashed border-blue-500 pointer-events-none"
                style={{
                  left: (selectedLayer?.x || 0) * scale,
                  top: (selectedLayer?.y || 0) * scale,
                  width: (selectedLayer?.width || 0) * scale,
                  height: (selectedLayer?.height || 0) * scale,
                  transform: `rotate(${selectedLayer?.rotation || 0}deg)`,
                }}
              />
            )}
          </div>
        </div>

        {/* Tab content */}
        <div className="bg-white p-4 rounded-lg shadow-inner">
          {/* Templates Tab */}
          {activeTab === "templates" && (
            <div className="space-y-4">
              <h3 className="font-bold text-purple-800">Choose a Template</h3>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((template, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer border border-gray-300 rounded overflow-hidden bg-white"
                    onClick={() => addImageLayer(template)}
                  >
                    <img
                      src={template || "/placeholder.svg"}
                      alt={`Template ${index + 1}`}
                      className="w-full h-auto object-contain"
                      style={{ aspectRatio: "1/1" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layers Tab */}
          {activeTab === "layers" && (
            <div className="space-y-4">
              <h3 className="font-bold text-purple-800">Manage Layers</h3>
              <div className="flex flex-col space-y-2 max-h-60 overflow-y-auto">
                {layers.map((layer) => (
                  <div
                    key={layer.id}
                    className={`flex items-center p-2 border rounded ${
                      selectedLayerId === layer.id ? "border-purple-500 bg-purple-100" : "border-gray-300"
                    }`}
                    onClick={() => setSelectedLayerId(layer.id)}
                  >
                    <div className="flex-1 flex items-center space-x-2">
                      {layer.type === "image" ? <ImageIcon size={16} /> : <Text size={16} />}
                      <span className="truncate text-sm">
                        {layer.type === "image" ? `Image ${layer.id.split("-")[1]}` : layer.content}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLayerVisibility(layer.id)
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveLayerUp(layer.id)
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={layers.indexOf(layer) === layers.length - 1}
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveLayerDown(layer.id)
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={layers.indexOf(layer) === 0}
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          duplicateLayer(layer.id)
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteLayer(layer.id)
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedLayer && (
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Opacity</label>
                    <input
                      type="range"
                      value={selectedLayer.opacity}
                      min={0}
                      max={100}
                      step={1}
                      onChange={(e) =>
                        updateLayerProperty(selectedLayer.id, "opacity", Number.parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Rotation</label>
                    <input
                      type="range"
                      value={selectedLayer.rotation}
                      min={0}
                      max={360}
                      step={1}
                      onChange={(e) =>
                        updateLayerProperty(selectedLayer.id, "rotation", Number.parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-1 border border-gray-300 rounded"
                      onClick={() => {
                        if (selectedLayer.width > 20) {
                          updateLayerProperty(selectedLayer.id, "width", selectedLayer.width - 10)
                          updateLayerProperty(selectedLayer.id, "height", selectedLayer.height - 10)
                        }
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      className="p-1 border border-gray-300 rounded"
                      onClick={() => {
                        updateLayerProperty(selectedLayer.id, "width", selectedLayer.width + 10)
                        updateLayerProperty(selectedLayer.id, "height", selectedLayer.height + 10)
                      }}
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      className="p-1 border border-gray-300 rounded"
                      onClick={() => {
                        updateLayerProperty(selectedLayer.id, "x", selectedLayer.x - 10)
                      }}
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      className="p-1 border border-gray-300 rounded"
                      onClick={() => {
                        updateLayerProperty(selectedLayer.id, "x", selectedLayer.x + 10)
                      }}
                    >
                      <ChevronRight size={14} />
                    </button>
                    <button
                      className="p-1 border border-gray-300 rounded"
                      onClick={() => {
                        updateLayerProperty(selectedLayer.id, "y", selectedLayer.y - 10)
                      }}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      className="p-1 border border-gray-300 rounded"
                      onClick={() => {
                        updateLayerProperty(selectedLayer.id, "y", selectedLayer.y + 10)
                      }}
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Text Tab */}
          {activeTab === "text" && (
            <div className="space-y-4">
              <h3 className="font-bold text-purple-800">Add Text</h3>
              <div className="space-y-2">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={2}
                />
                <button
                  onClick={addTextLayer}
                  className="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add Text
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium">Font</label>
                    <select
                      value={textFont}
                      onChange={(e) => setTextFont(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="Impact">Impact</option>
                      <option value="Arial">Arial</option>
                      <option value="Comic Sans MS">Comic Sans</option>
                      <option value="Times New Roman">Times New Roman</option>
                    </select>
                  </div>
                  <div className="w-1/3">
                    <label className="text-sm font-medium">Color</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-9 p-1 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Size</label>
                  <input
                    type="range"
                    value={textSize}
                    min={12}
                    max={72}
                    step={1}
                    onChange={(e) => setTextSize(Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Stroke Width</label>
                  <input
                    type="range"
                    value={textStroke}
                    min={0}
                    max={10}
                    step={0.5}
                    onChange={(e) => setTextStroke(Number.parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paint Tab */}
          {activeTab === "paint" && (
            <div className="space-y-4">
              <h3 className="font-bold text-purple-800">Paint Tool</h3>
              {!isPainting ? (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={startPainting}
                    className="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Start Painting
                  </button>
                  <p className="text-sm text-gray-500">Paint directly on your meme or add emoji stamps</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <button className="px-3 py-1 border border-gray-300 rounded" onClick={() => setIsPainting(false)}>
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 bg-purple-600 text-white rounded"
                      onClick={() => {
                        if (paintImage) finishPainting(paintImage)
                      }}
                    >
                      Apply
                    </button>
                  </div>

                  <div className="border border-gray-300 rounded overflow-hidden">
                    {paintImage && (
                      <ImprovedMSPaint
                        initialImage={paintImage}
                        width={canvasSize.width}
                        height={canvasSize.height}
                        onSave={finishPainting}
                        showEmojiStamper={true}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Effects Tab */}
          {activeTab === "effects" && (
            <div className="space-y-4">
              <h3 className="font-bold text-purple-800">Effects & Background</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium">Background</label>
                <div className="grid grid-cols-2 gap-2">
                  {backgroundPatterns.map((pattern) => (
                    <button
                      key={pattern.value}
                      onClick={() => setBackground(pattern.value)}
                      className={`p-2 rounded-lg text-white text-center text-sm ${pattern.value} ${
                        background === pattern.value ? "ring-2 ring-purple-500" : ""
                      }`}
                    >
                      {pattern.name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedLayerId && (
                <div className="space-y-2">
                  <h4 className="font-medium">Image Filters</h4>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Brightness</label>
                    <input
                      type="range"
                      value={filters.brightness}
                      min={0}
                      max={200}
                      step={1}
                      onChange={(e) => setFilters({ ...filters, brightness: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Contrast</label>
                    <input
                      type="range"
                      value={filters.contrast}
                      min={0}
                      max={200}
                      step={1}
                      onChange={(e) => setFilters({ ...filters, contrast: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Saturation</label>
                    <input
                      type="range"
                      value={filters.saturation}
                      min={0}
                      max={200}
                      step={1}
                      onChange={(e) => setFilters({ ...filters, saturation: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Hue Rotate</label>
                    <input
                      type="range"
                      value={filters.hue}
                      min={0}
                      max={360}
                      step={1}
                      onChange={(e) => setFilters({ ...filters, hue: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <button
                    onClick={applyFilters}
                    className="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mt-2"
                    disabled={!selectedLayerId}
                  >
                    Apply Effects
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Save button - always visible at bottom */}
        <button
          onClick={saveMeme}
          className="w-full p-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold rounded-lg flex items-center justify-center space-x-2"
        >
          <Download size={18} />
          <span>Save Meme</span>
        </button>
      </div>

      {/* Image saver modal */}
      {savedImageUrl && (
        <ImageSaver imageUrl={savedImageUrl} onClose={() => setSavedImageUrl(null)} memeName="purpl-meme" />
      )}
    </div>
  )
}
