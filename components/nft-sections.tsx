"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function NFTSections() {
  return (
    <section id="nft-airdrop" className="py-20 relative bg-cosmic-dark bg-opacity-30 overflow-hidden">
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-comic font-bold mb-4 cosmic-text">NFT Airdrop</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purpl to-cosmic mx-auto mb-6"></div>
          <p className="text-xl text-purpl-light max-w-2xl mx-auto">
            9.09% of tokens (1B $PURPL) are allocated for the initial airdrop to NFT holders
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Degen Hoopers NFT Card - Styled like the reference image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-purple-700 p-6 rounded-2xl border border-yellow-400 hover:shadow-lg hover:shadow-purpl/20 transition-all"
          >
            {/* Header with logo and title */}
            <div className="flex items-center mb-6">
              <div className="bg-yellow-400 rounded-full w-20 h-20 flex items-center justify-center mr-4 overflow-hidden">
                <Image
                  src="https://chocolate-able-walrus-950.mypinata.cloud/ipfs/bafybeie2bhrvn6mtyzbvugnkz74fpk5uq234udedpdw2cgqhygmelbxjgi/dhn-logo.png"
                  width={80}
                  height={80}
                  alt="Degen Hoopers"
                  className="rounded-full object-contain"
                />
              </div>
              <h3 className="text-3xl md:text-4xl font-comic font-bold text-yellow-400">Degen Hoopers</h3>
            </div>

            {/* Description text */}
            <p className="text-white mb-8 text-lg md:text-xl">
              Degen Hoopers NFT holders receive $PURPL tokens based on their NFT rarity tier.
            </p>

            {/* NFT tiers with better spacing - Mobile-friendly version */}
            <div className=
