"use client";
import { MobileOptimizedMemeGenerator } from "@/components/mobile-optimized-meme-generator"
import { MemeOrientationNotice } from "@/components/meme-orientation-notice"
import EnhancedMemeGenerator from "@/components/enhanced-meme-generator"
import { useMobile } from "@/hooks/use-mobile"

export default function MemeGeneratorPage() {
  // We need to use client components for device detection
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gradient-to-b from-purple-100 to-white">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">$PURPL Meme Generator</h1>

        <MemeOrientationNotice />

        <ClientMemeGenerator />
      </div>
    </main>
  )
}
// Client component to handle device detection
;("use client")
function ClientMemeGenerator() {
  const isMobile = useMobile()

  return <div className="w-full">{isMobile ? <MobileOptimizedMemeGenerator /> : <EnhancedMemeGenerator />}</div>
}
