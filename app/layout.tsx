import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Purple Panther Phoenix Unicorn | $PURPL",
  description: "The most magical meme coin in the crypto universe! Join the $PURPL revolution!",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen items-center`}>
        <div className="w-full max-w-[1920px]">{children}</div>
      </body>
    </html>
  )
}

import "./globals.css"

import "./globals.css"


import './globals.css'