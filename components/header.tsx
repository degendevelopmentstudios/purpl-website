"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [wobble, setWobble] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const triggerWobble = () => {
    setWobble(true)
    setTimeout(() => setWobble(false), 2000)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cosmic-dark/90 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={wobble ? "wobble-animation" : ""} onClick={triggerWobble}>
            <Image
              src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-logo.png"
              alt="PURPL Logo"
              width={50}
              height={50}
              className="rounded-full meme-hover"
            />
          </div>
          <Image
            src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-chrome.png"
            alt="$PURPL"
            width={100}
            height={40}
            className="meme-hover hidden sm:block"
          />
          <Image
            src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-chrome.png"
            alt="$PURPL"
            width={60}
            height={24}
            className="meme-hover sm:hidden"
          />
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu size={24} />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-white hover:text-gold transition-colors meme-hover">
            About
          </a>
          <a href="#tokenomics" className="text-white hover:text-gold transition-colors meme-hover">
            Tokenomics
          </a>
          <a href="#roadmap" className="text-white hover:text-gold transition-colors meme-hover">
            Roadmap
          </a>
          <a href="#meme-section" className="text-white hover:text-gold transition-colors meme-hover">
            Memes
          </a>
          <Link
            href="https://degenhoopers.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-purpl to-cosmic rounded-full text-white font-bold hover:opacity-90 transition-opacity meme-hover"
          >
            Degen Hoopers
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cosmic-dark/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="#about"
              className="text-white py-2 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#tokenomics"
              className="text-white py-2 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tokenomics
            </a>
            <a
              href="#roadmap"
              className="text-white py-2 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </a>
            <a
              href="#meme-section"
              className="text-white py-2 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Memes
            </a>
            <Link
              href="https://degenhoopers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-purpl to-cosmic rounded-full text-white font-bold hover:opacity-90 transition-opacity text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Degen Hoopers
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
