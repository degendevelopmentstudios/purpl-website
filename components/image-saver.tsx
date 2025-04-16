"use client"

import { useState, useEffect } from "react"
import { Download, Share2, X, Copy } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface ImageSaverProps {
  imageUrl: string | null
  onClose: () => void
  memeName?: string
}

export default function ImageSaver({ imageUrl, onClose, memeName = "purpl-meme" }: ImageSaverProps) {
  const [canShare, setCanShare] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [copied, setCopied] = useState(false)
  const [downloadStarted, setDownloadStarted] = useState(false)
  const isMobileView = useMobile()

  useEffect(() => {
    // Check if Web Share API is available
    setCanShare(typeof navigator !== "undefined" && !!navigator.share)

    // Check device type
    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent.toLowerCase()
      setIsMobile(/iphone|ipad|ipod|android/.test(userAgent))
      setIsIOS(/iphone|ipad|ipod/.test(userAgent))
      setIsAndroid(/android/.test(userAgent))
    }
  }, [])

  const handleDownload = async () => {
    if (!imageUrl) return

    setDownloadStarted(true)

    try {
      // Create a blob from the data URL
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      // Create object URL for the blob
      const blobUrl = URL.createObjectURL(blob)

      // Create a link element
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = `${memeName}-${Date.now()}.png`

      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()

      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl)
        document.body.removeChild(link)
      }, 100)

      // For iOS devices, show additional instructions
      if (isIOS) {
        setTimeout(() => {
          alert('To save the image: tap and hold on the image, then select "Add to Photos"')
        }, 1000)
      }
    } catch (error) {
      console.error("Error downloading image:", error)

      // Fallback for mobile devices
      if (isMobile) {
        window.open(imageUrl, "_blank")
      }
    }

    // Reset download state after a delay
    setTimeout(() => {
      setDownloadStarted(false)
    }, 2000)
  }

  const handleShare = async () => {
    if (!imageUrl || !canShare) return

    try {
      // Convert data URL to blob for sharing
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      // Create file from blob
      const file = new File([blob], `${memeName}-${Date.now()}.png`, { type: "image/png" })

      await navigator.share({
        title: "Check out my $PURPL meme!",
        text: "I created this awesome meme with Purple Panther Phoenix Unicorn!",
        files: [file],
      })
    } catch (error) {
      console.error("Error sharing:", error)

      // Fallback to simpler share if file sharing fails
      try {
        await navigator.share({
          title: "Check out my $PURPL meme!",
          text: "I created this awesome meme with Purple Panther Phoenix Unicorn!",
          url: imageUrl,
        })
      } catch (fallbackError) {
        console.error("Fallback sharing failed:", fallbackError)
        // Fallback to download if sharing fails
        handleDownload()
      }
    }
  }

  const handleCopy = async () => {
    if (!imageUrl) return

    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      // Copy to clipboard using Clipboard API
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error copying image:", error)
      alert("Couldn't copy image. Try downloading instead.")
    }
  }

  if (!imageUrl) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-cosmic-dark/90 p-3 md:p-4 rounded-xl max-w-full w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: isMobileView ? "95%" : "450px" }}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg md:text-xl font-bold cosmic-text">Your Meme is Ready!</h3>
          <button onClick={onClose} className="p-1 hover:bg-purpl/30 rounded-full" aria-label="Close">
            <X size={isMobileView ? 20 : 24} />
          </button>
        </div>

        <div className="flex justify-center mb-4">
          <div className="relative w-full aspect-square max-w-sm">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Generated meme"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          <button
            onClick={handleDownload}
            disabled={downloadStarted}
            className={`px-3 md:px-4 py-2 ${downloadStarted ? "bg-green-600" : "bg-gradient-to-r from-purpl to-cosmic"} rounded-full text-white font-bold flex items-center gap-2 min-w-[100px] md:min-w-[120px] justify-center text-sm md:text-base`}
          >
            <Download size={isMobileView ? 16 : 18} />
            {downloadStarted ? "Downloading..." : isIOS ? "Save" : "Download"}
          </button>

          {canShare && (
            <button
              onClick={handleShare}
              className="px-3 md:px-4 py-2 bg-gradient-to-r from-gold to-yellow-500 rounded-full text-cosmic-dark font-bold flex items-center gap-2 min-w-[100px] md:min-w-[120px] justify-center text-sm md:text-base"
            >
              <Share2 size={isMobileView ? 16 : 18} />
              Share
            </button>
          )}

          <button
            onClick={handleCopy}
            className={`px-3 md:px-4 py-2 ${copied ? "bg-green-600" : "bg-gradient-to-r from-blue-500 to-purple-500"} rounded-full text-white font-bold flex items-center gap-2 min-w-[100px] md:min-w-[120px] justify-center text-sm md:text-base`}
          >
            <Copy size={isMobileView ? 16 : 18} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {isIOS && (
          <p className="text-xs text-center mt-3 text-purpl-light px-4">
            After tapping "Save", press and hold on the image that appears and select "Add to Photos"
          </p>
        )}
      </div>
    </div>
  )
}
