import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PURPL Meme Generator | Create & Share $PURPL Memes",
  description:
    "Create and share your own $PURPL memes with our advanced meme generator. Customize with text, emojis, and layers!",
}

export default function MemeGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
