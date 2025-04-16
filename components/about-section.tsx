"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-comic font-bold mb-4 cosmic-text">About $PURPL</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purpl to-cosmic mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-cosmic-dark bg-opacity-50 p-6 rounded-2xl border border-purpl"
          >
            <div className="bg-purpl rounded-full w-12 h-12 flex items-center justify-center mb-4 png-fix">
              <Sparkles className="text-gold" />
            </div>
            <h3 className="text-2xl font-comic font-bold mb-3 text-gold">Magical Meme</h3>
            <p className="text-purpl-light">
              $PURPL (also known as Purple Stuff) is a community meme coin thriving on the XPR Network. Created by Degen
              Development Studios, it powers their innovative NFT and Meme Platform codenamed "Project DeLorean".
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-cosmic-dark bg-opacity-50 p-6 rounded-2xl border border-purpl"
          >
            <div className="bg-purpl rounded-full w-12 h-12 flex items-center justify-center mb-4 png-fix">
              <Sparkles className="text-gold" />
            </div>
            <h3 className="text-2xl font-comic font-bold mb-3 text-gold">Community Driven</h3>
            <p className="text-purpl-light">
              This magical meme unites the XPR community in a realm of fun and creativity. Purple Panther Phoenix
              Unicorn NFTs harmoniously coexist within "Project DeLorean" alongside the Degen Hoopers and $NUTMEG
              community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-cosmic-dark bg-opacity-50 p-6 rounded-2xl border border-purpl"
          >
            <div className="bg-purpl rounded-full w-12 h-12 flex items-center justify-center mb-4 png-fix">
              <Sparkles className="text-gold" />
            </div>
            <h3 className="text-2xl font-comic font-bold mb-3 text-gold">Cosmic Potential</h3>
            <p className="text-purpl-light">
              These two memes weave into an epic story and lore...VILLAS (🤫). With 11,000,000,000 $PURPL tokens and
              10,000 Purple Panther Phoenix Unicorn NFTs, this playful ecosystem unveils the mystical secrets hidden
              within the XPR Network...🕯️⚛️🕯️
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
