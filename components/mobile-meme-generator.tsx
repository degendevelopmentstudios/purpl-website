"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImprovedMSPaint } from "./improved-ms-paint"
import { ChevronUp, ChevronDown, Trash2, Download, Palette, Layers, Type, Wand2 } from "lucide-react"

// Define types for our layers and other data
type Layer = {
  id: string
  type: "image" | "text" | "drawing" | "emoji"
  content: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  zIndex: number
  opacity: number
  filter: string
  visible: boolean
}

type MemeTemplate = {
  id: string
  name: string
  url: string
}

const MEME_TEMPLATES: MemeTemplate[] = [
  { id: "1", name: "Classic Doge", url: "/placeholder.svg?key=n5wzq" },
  { id: "2", name: "Distracted Boyfriend", url: "/placeholder.svg?key=uzvmm" },
  { id: "3", name: "Drake Hotline Bling", url: "/placeholder.svg?key=tfcpd" },
  { id: "4", name: "Purple Coin", url: "/placeholder.svg?key=3md3d" },
  { id: "5", name: "Stonks", url: "/stonks-man-upward-graph.png" },
]

const FILTERS = [
  { name: "None", value: "" },
  { name: "Grayscale", value: "grayscale(100%)" },
  { name: "Sepia", value: "sepia(100%)" },
  { name: "Invert", value: "invert(100%)" },
  { name: "Blur", value: "blur(5px)" },
  { name: "Brightness", value: "brightness(150%)" },
  { name: "Contrast", value: "contrast(200%)" },
  { name: "Hue Rotate", value: "hue-rotate(90deg)" },
  { name: "Saturate", value: "saturate(200%)" },
  { name: "Purple Tint", value: "sepia(50%) hue-rotate(230deg)" },
]

export const MobileMemeGenerator: React.FC = () => {
  // State for the meme canvas
  const [layers, setLayers] = useState<Layer[]>([])
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null)
  const [canvasWidth, setCanvasWidth] = useState(320)
  const [canvasHeight, setCanvasHeight] = useState(320)
  const [activeTab, setActiveTab] = useState("template")
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null)
  const [textInput, setTextInput] = useState("")
  const [textColor, setTextColor] = useState("#ffffff")
  const [textSize, setTextSize] = useState(24)
  const [textStroke, setTextStroke] = useState(true)
  const [isPaintMode, setIsPaintMode] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const canvasRef = useRef<HTMLDivElement>(null)
  const paintCanvasRef = useRef<HTMLCanvasElement>(null)

  // Initialize with a template
  useEffect(() => {
    if (MEME_TEMPLATES.length > 0) {
      const template = MEME_TEMPLATES[0]
      setSelectedTemplate(template)
      addImageLayer(template.url)
    }
  }, [])

  // Resize canvas based on screen size
  useEffect(() => {
    const updateCanvasSize = () => {
      const screenWidth = window.innerWidth
      const newWidth = Math.min(screenWidth - 32, 500)
      setCanvasWidth(newWidth)
      setCanvasHeight(newWidth)
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [])

  // Layer management functions
  const addImageLayer = (imageUrl: string) => {
    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      type: "image",
      content: imageUrl,
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      rotation: 0,
      zIndex: layers.length,
      opacity: 1,
      filter: "",
      visible: true,
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newLayer.id)
  }

  const addTextLayer = () => {
    if (!textInput.trim()) return

    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      type: "text",
      content: textInput,
      x: canvasWidth / 2 - 50,
      y: canvasHeight / 2 - 20,
      width: 100,
      height: 40,
      rotation: 0,
      zIndex: layers.length,
      opacity: 1,
      filter: "",
      visible: true,
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newLayer.id)
  }

  const addEmojiLayer = (emoji: string) => {
    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      type: "emoji",
      content: emoji,
      x: canvasWidth / 2 - 20,
      y: canvasHeight / 2 - 20,
      width: 40,
      height: 40,
      rotation: 0,
      zIndex: layers.length,
      opacity: 1,
      filter: "",
      visible: true,
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newLayer.id)
  }

  const updateLayer = (id: string, updates: Partial<Layer>) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer)))
  }

  const deleteLayer = (id: string) => {
    setLayers(layers.filter((layer) => layer.id !== id))
    if (selectedLayerId === id) {
      setSelectedLayerId(null)
    }
  }

  const moveLayerForward = (id: string) => {
    const layerIndex = layers.findIndex((layer) => layer.id === id)
    if (layerIndex < layers.length - 1) {
      const newLayers = [...layers]
      const temp = newLayers[layerIndex].zIndex
      newLayers[layerIndex].zIndex = newLayers[layerIndex + 1].zIndex
      newLayers[layerIndex + 1].zIndex = temp
      setLayers([...newLayers].sort((a, b) => a.zIndex - b.zIndex))
    }
  }

  const moveLayerBackward = (id: string) => {
    const layerIndex = layers.findIndex((layer) => layer.id === id)
    if (layerIndex > 0) {
      const newLayers = [...layers]
      const temp = newLayers[layerIndex].zIndex
      newLayers[layerIndex].zIndex = newLayers[layerIndex - 1].zIndex
      newLayers[layerIndex - 1].zIndex = temp
      setLayers([...newLayers].sort((a, b) => a.zIndex - b.zIndex))
    }
  }

  const toggleLayerVisibility = (id: string) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer)))
  }

  const generateMeme = async () => {
    if (canvasRef.current) {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        const ctx = canvas.getContext("2d")

        if (ctx) {
          // Fill background
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvasWidth, canvasHeight)

          // Draw all visible layers in order
          for (const layer of [...layers].sort((a, b) => a.zIndex - b.zIndex)) {
            if (!layer.visible) continue

            ctx.save()
            ctx.globalAlpha = layer.opacity

            // Apply transformations
            ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2)
            ctx.rotate((layer.rotation * Math.PI) / 180)

            if (layer.filter) {
              ctx.filter = layer.filter
            }

            if (layer.type === "image") {
              const img = new Image()
              img.crossOrigin = "anonymous"
              img.src = layer.content
              await new Promise((resolve) => {
                img.onload = resolve
              })
              ctx.drawImage(img, -layer.width / 2, -layer.height / 2, layer.width, layer.height)
            } else if (layer.type === "text") {
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.font = `${textSize}px Impact, sans-serif`

              if (textStroke) {
                ctx.strokeStyle = "#000000"
                ctx.lineWidth = 3
                ctx.strokeText(layer.content, 0, 0)
              }

              ctx.fillStyle = textColor
              ctx.fillText(layer.content, 0, 0)
            } else if (layer.type === "emoji") {
              ctx.font = `${layer.height}px Arial`
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.fillText(layer.content, 0, 0)
            }

            ctx.restore()
          }

          const dataUrl = canvas.toDataURL("image/png")
          setGeneratedImage(dataUrl)
          setIsPaintMode(true)
          setActiveTab("paint")
        }
      } catch (error) {
        console.error("Error generating meme:", error)
      }
    }
  }

  const selectedLayer = selectedLayerId ? layers.find((layer) => layer.id === selectedLayerId) : null

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-2 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-center mb-2">$PURPL Meme Maker</h2>

      {/* Main Canvas Area */}
      <div
        ref={canvasRef}
        className="relative bg-gray-100 border border-gray-300 rounded-lg overflow-hidden mb-2"
        style={{ width: canvasWidth, height: canvasHeight, margin: "0 auto" }}
      >
        {!isPaintMode ? (
          // Meme editor view
          <>
            {layers.map(
              (layer) =>
                layer.visible && (
                  <div
                    key={layer.id}
                    className={`absolute ${selectedLayerId === layer.id ? "ring-2 ring-purple-500" : ""}`}
                    style={{
                      left: `${layer.x}px`,
                      top: `${layer.y}px`,
                      width: `${layer.width}px`,
                      height: `${layer.height}px`,
                      zIndex: layer.zIndex,
                      opacity: layer.opacity,
                      transform: `rotate(${layer.rotation}deg)`,
                      filter: layer.filter,
                      cursor: "move",
                      touchAction: "none",
                    }}
                    onClick={() => setSelectedLayerId(layer.id)}
                  >
                    {layer.type === "image" && (
                      <img
                        src={layer.content || "/placeholder.svg"}
                        alt="Meme layer"
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    )}
                    {layer.type === "text" && (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          fontSize: `${textSize}px`,
                          color: textColor,
                          textShadow: textStroke
                            ? "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                            : "none",
                          wordBreak: "break-word",
                          textAlign: "center",
                        }}
                      >
                        {layer.content}
                      </div>
                    )}
                    {layer.type === "emoji" && (
                      <div className="w-full h-full flex items-center justify-center text-4xl">{layer.content}</div>
                    )}
                  </div>
                ),
            )}
          </>
        ) : (
          // Paint mode view
          <div className="w-full h-full">
            {generatedImage && (
              <ImprovedMSPaint
                initialImage={generatedImage}
                width={canvasWidth}
                height={canvasHeight}
                canvasRef={paintCanvasRef}
                emojiStamperEnabled={true}
              />
            )}
          </div>
        )}
      </div>

      {/* Mobile-friendly Tabs for Tools */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-2">
          <TabsTrigger value="template" className="text-xs p-1">
            <Image className="w-4 h-4 mr-1" />
            Template
          </TabsTrigger>
          <TabsTrigger value="text" className="text-xs p-1">
            <Type className="w-4 h-4 mr-1" />
            Text
          </TabsTrigger>
          <TabsTrigger value="effects" className="text-xs p-1">
            <Wand2 className="w-4 h-4 mr-1" />
            Effects
          </TabsTrigger>
          <TabsTrigger value="layers" className="text-xs p-1">
            <Layers className="w-4 h-4 mr-1" />
            Layers
          </TabsTrigger>
          <TabsTrigger value="paint" className="text-xs p-1">
            <Palette className="w-4 h-4 mr-1" />
            Paint
          </TabsTrigger>
        </TabsList>

        <TabsContent value="template" className="mt-0">
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded">
            {MEME_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className={`cursor-pointer border rounded p-1 ${selectedTemplate?.id === template.id ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}
                onClick={() => {
                  setSelectedTemplate(template)
                  // Replace the base image layer or add a new one
                  const baseImageLayer = layers.find((l) => l.type === "image" && l.zIndex === 0)
                  if (baseImageLayer) {
                    updateLayer(baseImageLayer.id, { content: template.url })
                  } else {
                    addImageLayer(template.url)
                  }
                }}
              >
                <img
                  src={template.url || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-16 object-cover rounded"
                />
                <p className="text-xs text-center mt-1 truncate">{template.name}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="text" className="mt-0">
          <div className="space-y-2 p-2 bg-gray-50 rounded">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={addTextLayer} size="sm">
                Add
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs block mb-1">Text Color</label>
                <Input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-8"
                />
              </div>
              <div>
                <label className="text-xs block mb-1">Text Size</label>
                <Slider
                  value={[textSize]}
                  min={12}
                  max={72}
                  step={1}
                  onValueChange={(value) => setTextSize(value[0])}
                  className="py-2"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="textStroke" checked={textStroke} onChange={() => setTextStroke(!textStroke)} />
              <label htmlFor="textStroke" className="text-xs">
                Text Outline
              </label>
            </div>

            <div className="mt-2">
              <p className="text-xs font-medium mb-1">Quick Emoji</p>
              <div className="grid grid-cols-8 gap-1">
                {["😂", "🔥", "💯", "👍", "🎉", "❤️", "🤔", "😎"].map((emoji) => (
                  <button
                    key={emoji}
                    className="text-xl p-1 border rounded hover:bg-gray-100"
                    onClick={() => addEmojiLayer(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="effects" className="mt-0">
          <div className="space-y-2 p-2 bg-gray-50 rounded">
            {selectedLayer ? (
              <>
                <div>
                  <label className="text-xs block mb-1">Opacity</label>
                  <Slider
                    value={[selectedLayer.opacity * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => updateLayer(selectedLayer.id, { opacity: value[0] / 100 })}
                    className="py-2"
                  />
                </div>

                <div>
                  <label className="text-xs block mb-1">Rotation</label>
                  <Slider
                    value={[selectedLayer.rotation]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={(value) => updateLayer(selectedLayer.id, { rotation: value[0] })}
                    className="py-2"
                  />
                </div>

                <div>
                  <label className="text-xs block mb-1">Filter</label>
                  <Select
                    value={selectedLayer.filter || ""}
                    onValueChange={(value) => updateLayer(selectedLayer.id, { filter: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select filter" />
                    </SelectTrigger>
                    <SelectContent>
                      {FILTERS.map((filter) => (
                        <SelectItem key={filter.name} value={filter.value}>
                          {filter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Select a layer to apply effects</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="layers" className="mt-0">
          <div className="max-h-40 overflow-y-auto p-2 bg-gray-50 rounded">
            {layers.length > 0 ? (
              <div className="space-y-1">
                {[...layers]
                  .sort((a, b) => b.zIndex - a.zIndex)
                  .map((layer) => (
                    <div
                      key={layer.id}
                      className={`flex items-center p-1 rounded ${selectedLayerId === layer.id ? "bg-purple-100" : "bg-white"} border`}
                      onClick={() => setSelectedLayerId(layer.id)}
                    >
                      <button
                        className={`w-5 h-5 mr-1 ${layer.visible ? "text-blue-500" : "text-gray-400"}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLayerVisibility(layer.id)
                        }}
                      >
                        {layer.visible ? "👁️" : "👁️‍🗨️"}
                      </button>

                      <span className="text-xs flex-grow truncate">
                        {layer.type === "image"
                          ? "Image"
                          : layer.type === "text"
                            ? `"${layer.content}"`
                            : layer.type === "emoji"
                              ? layer.content
                              : "Layer"}
                      </span>

                      <div className="flex space-x-1">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveLayerForward(layer.id)
                          }}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveLayerBackward(layer.id)
                          }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteLayer(layer.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No layers added yet</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="paint" className="mt-0">
          <div className="space-y-2 p-2 bg-gray-50 rounded">
            {!isPaintMode ? (
              <div className="text-center">
                <p className="text-sm mb-2">Generate your meme first to enter paint mode</p>
                <Button onClick={generateMeme} className="w-full">
                  Generate Meme
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xs mb-2">Use the paint tools to add final touches</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => {
                      setIsPaintMode(false)
                      setGeneratedImage(null)
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Back to Editor
                  </Button>
                  <Button
                    onClick={() => {
                      if (paintCanvasRef.current) {
                        const dataUrl = paintCanvasRef.current.toDataURL("image/png")
                        const link = document.createElement("a")
                        link.download = "purpl-meme.png"
                        link.href = dataUrl
                        link.click()
                      }
                    }}
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Action Bar */}
      <div className="flex justify-between mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (isPaintMode) {
              setIsPaintMode(false)
              setGeneratedImage(null)
            } else {
              // Reset to initial state
              if (MEME_TEMPLATES.length > 0) {
                const template = MEME_TEMPLATES[0]
                setSelectedTemplate(template)
                setLayers([
                  {
                    id: `layer-${Date.now()}`,
                    type: "image",
                    content: template.url,
                    x: 0,
                    y: 0,
                    width: canvasWidth,
                    height: canvasHeight,
                    rotation: 0,
                    zIndex: 0,
                    opacity: 1,
                    filter: "",
                    visible: true,
                  },
                ])
                setSelectedLayerId(null)
              }
            }
          }}
        >
          Reset
        </Button>

        {!isPaintMode ? (
          <Button onClick={generateMeme}>
            <Wand2 className="w-4 h-4 mr-1" />
            Generate Meme
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (paintCanvasRef.current) {
                const dataUrl = paintCanvasRef.current.toDataURL("image/png")
                const link = document.createElement("a")
                link.download = "purpl-meme.png"
                link.href = dataUrl
                link.click()
              }
            }}
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        )}
      </div>
    </div>
  )
}
