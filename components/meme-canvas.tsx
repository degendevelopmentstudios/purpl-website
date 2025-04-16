"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import html2canvas from "html2canvas"

interface MemeCanvasProps {
  memeRef: React.RefObject<HTMLDivElement>
  onCapture: (dataUrl: string) => void
  width?: number
  height?: number
}

export default function MemeCanvas({ memeRef, onCapture, width = 1080, height = 1080 }: MemeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Function to capture the meme as a high-quality image
  const captureMeme = async () => {
    if (!memeRef.current || !canvasRef.current || isCapturing) return

    setIsCapturing(true)
    setError(null)

    try {
      // Use html2canvas to capture the meme element
      const canvas = await html2canvas(memeRef.current, {
        backgroundColor: null,
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        allowTaint: true,
        logging: false,
      })

      // Create a square canvas with the specified dimensions
      const squareCanvas = canvasRef.current
      const ctx = squareCanvas.getContext("2d")

      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      // Set canvas dimensions to the desired square size
      squareCanvas.width = width
      squareCanvas.height = height

      // Fill with background color (if needed)
      ctx.fillStyle = "#1e003c" // Purple background
      ctx.fillRect(0, 0, width, height)

      // Calculate scaling to fit the captured content in the square
      const scale = Math.min(width / canvas.width, height / canvas.height)

      // Calculate position to center the image
      const x = (width - canvas.width * scale) / 2
      const y = (height - canvas.height * scale) / 2

      // Draw the captured content centered and scaled
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, x, y, canvas.width * scale, canvas.height * scale)

      // Convert to data URL
      const dataUrl = squareCanvas.toDataURL("image/png")

      // Pass the data URL to the parent component
      onCapture(dataUrl)
    } catch (err) {
      console.error("Error capturing meme:", err)
      setError("Failed to capture meme. Please try again.")
    } finally {
      setIsCapturing(false)
    }
  }

  // Expose the capture function to parent components
  useEffect(() => {
    if (memeRef.current) {
      // @ts-ignore
      memeRef.current.captureMeme = captureMeme
    }

    return () => {
      if (memeRef.current) {
        // @ts-ignore
        delete memeRef.current.captureMeme
      }
    }
  }, [memeRef.current])

  return (
    <>
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} width={width} height={height} style={{ display: "none" }} />

      {/* Error message if capture fails */}
      {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
    </>
  )
}
