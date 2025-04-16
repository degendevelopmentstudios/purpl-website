import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-cosmic-dark py-12 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Image
              src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-logo.png"
              alt="PURPL Logo"
              width={60}
              height={60}
              className="rounded-full mr-3"
            />
            <div>
              <Image
                src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/purpl-chrome.png"
                alt="$PURPL"
                width={120}
                height={40}
              />
              <p className="text-white">Purple Panther Phoenix Unicorn</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <Link
              href="https://degenhoopers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-purpl to-cosmic rounded-full text-white font-bold hover:opacity-90 transition-opacity meme-hover"
            >
              Visit Degen Hoopers
            </Link>
          </div>
        </div>

        <div className="border-t border-purpl-dark pt-6 text-center">
          <div className="mb-4">
            <Image
              src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/dds-logo.png"
              alt="Degen Development Studios"
              width={200}
              height={100}
              className="mx-auto"
            />
          </div>
          <p className="text-sm text-gray-400 mb-2">
            $PURPL is a meme coin with no intrinsic value or financial return expectation. This website is for
            entertainment purposes only.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} Purple Panther Phoenix Unicorn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
