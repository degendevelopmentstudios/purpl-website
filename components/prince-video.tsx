"use client"

import { useEffect, useRef, useState } from "react"

// Declare YT as a global variable
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: any
  }
}

export default function PrinceVideo() {
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const [isApiLoaded, setIsApiLoaded] = useState(false)

  useEffect(() => {
    // Add YouTube API script only if it doesn't exist
    if (!document.getElementById("youtube-api")) {
      // Define the callback function on the window object
      // @ts-ignore
      window.onYouTubeIframeAPIReady = () => {
        setIsApiLoaded(true)
      }

      // Create script element and add to document
      const tag = document.createElement("script")
      tag.id = "youtube-api"
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    } else {
      // If script already exists, assume API is loaded
      setIsApiLoaded(true)
    }

    return () => {
      // Cleanup - remove the global callback when component unmounts
      // @ts-ignore
      window.onYouTubeIframeAPIReady = undefined
    }
  }, [])

  useEffect(() => {
    // Only create player when API is loaded and container exists
    if (isApiLoaded && playerContainerRef.current) {
      // Make sure YT is defined
      // @ts-ignore
      if (typeof window.YT !== "undefined" && window.YT.Player) {
        try {
          // @ts-ignore
          const player = new window.YT.Player(playerContainerRef.current, {
            videoId: "aXJhDltzYVQ",
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              controls: 1,
              start: 33,
              mute: 0, // Start unmuted
              playsinline: 1,
              modestbranding: 1,
              rel: 0,
            },
            events: {
              onReady: (event) => {
                event.target.playVideo()
                event.target.unMute()
              },
            },
          })

          return () => {
            if (player && typeof player.destroy === "function") {
              player.destroy()
            }
          }
        } catch (error) {
          console.error("Error initializing YouTube player:", error)
        }
      }
    }
  }, [isApiLoaded])

  return (
    <div className="w-full max-w-3xl mx-auto my-12 rounded-xl overflow-hidden shadow-2xl">
      <div className="relative pb-[56.25%] h-0 bg-cosmic-dark/50">
        <div ref={playerContainerRef} className="absolute top-0 left-0 w-full h-full"></div>
      </div>
      <div className="bg-cosmic-dark/80 p-4 text-center">
        <h3 className="text-xl font-bold text-purpl-light">Purple Rain - Prince</h3>
        <p className="text-sm text-gray-300">The perfect soundtrack for your $PURPL journey</p>
      </div>
    </div>
  )
}
