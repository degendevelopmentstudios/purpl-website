"use client"

import { motion } from "framer-motion"
import { Coins, Users, Rocket, ShieldCheck, Flame, Star } from "lucide-react"

export default function TokenomicsSection() {
  return (
    <section id="tokenomics" className="py-20 relative bg-cosmic-dark bg-opacity-30 overflow-hidden">
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-comic font-bold mb-4 cosmic-text">Tokenomics</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purpl to-cosmic mx-auto mb-6"></div>
          <p className="text-xl text-purpl-light max-w-2xl mx-auto">
            $PURPL has a total supply of 11,000,000,000 tokens distributed to ensure fairness and community growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purpl-dark to-cosmic p-6 rounded-2xl border border-gold hover:shadow-lg hover:shadow-purpl/20 transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <ShieldCheck className="text-cosmic-dark" />
              </div>
              <h3 className="text-2xl font-comic font-bold text-gold">Staking Pools</h3>
            </div>
            <p className="text-white mb-4">
              30% of tokens (3.3B $PURPL) are allocated to staking pools and Treehorn's Treehouse, rewarding long-term
              holders.
            </p>
            <div className="w-full bg-cosmic-dark rounded-full h-4">
              <div className="bg-gradient-to-r from-gold to-yellow-400 h-4 rounded-full" style={{ width: "30%" }}></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purpl-dark to-cosmic p-6 rounded-2xl border border-gold hover:shadow-lg hover:shadow-purpl/20 transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <Coins className="text-cosmic-dark" />
              </div>
              <h3 className="text-2xl font-comic font-bold text-gold">Liquidity</h3>
            </div>
            <p className="text-white mb-4">
              15% of tokens (1.65B $PURPL) are locked for liquidity to ensure stable trading and price discovery.
            </p>
            <div className="w-full bg-cosmic-dark rounded-full h-4">
              <div className="bg-gradient-to-r from-gold to-yellow-400 h-4 rounded-full" style={{ width: "15%" }}></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purpl-dark to-cosmic p-6 rounded-2xl border border-gold hover:shadow-lg hover:shadow-purpl/20 transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <Flame className="text-cosmic-dark" />
              </div>
              <h3 className="text-2xl font-comic font-bold text-gold">Token Burn</h3>
            </div>
            <p className="text-white mb-4">
              10% of tokens (1.1B $PURPL) are allocated for token burns—80M for wallet holders, 30M for NFT holders,
              990M reserved.
            </p>
            <div className="w-full bg-cosmic-dark rounded-full h-4">
              <div className="bg-gradient-to-r from-gold to-yellow-400 h-4 rounded-full" style={{ width: "10%" }}></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purpl-dark to-cosmic p-6 rounded-2xl border border-gold hover:shadow-lg hover:shadow-purpl/20 transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <Rocket className="text-cosmic-dark" />
              </div>
              <h3 className="text-2xl font-comic font-bold text-gold">Rewards & Marketing</h3>
            </div>
            <p className="text-white mb-4">
              18.41% of tokens (2.025B $PURPL) are allocated for marketing initiatives, community rewards, and game
              prizes.
            </p>
            <div className="w-full bg-cosmic-dark rounded-full h-4">
              <div
                className="bg-gradient-to-r from-gold to-yellow-400 h-4 rounded-full"
                style={{ width: "18.41%" }}
              ></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purpl-dark to-cosmic p-6 rounded-2xl border border-gold hover:shadow-lg hover:shadow-purpl/20 transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <Users className="text-cosmic-dark" />
              </div>
              <h3 className="text-2xl font-comic font-bold text-gold">Community Reserve</h3>
            </div>
            <p className="text-white mb-4">
              12.5% of tokens (1.375B $PURPL) are reserved for community initiatives and future development.
            </p>
            <div className="w-full bg-cosmic-dark rounded-full h-4">
              <div
                className="bg-gradient-to-r from-gold to-yellow-400 h-4 rounded-full"
                style={{ width: "12.5%" }}
              ></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purpl-dark to-cosmic p-6 rounded-2xl border border-gold hover:shadow-lg hover:shadow-purpl/20 transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <Star className="text-cosmic-dark" />
              </div>
              <h3 className="text-2xl font-comic font-bold text-gold">Founders</h3>
            </div>
            <p className="text-white mb-4">
              5% of tokens (550M $PURPL) are allocated to the founders, with approximately 183.33M per founder.
            </p>
            <div className="w-full bg-cosmic-dark rounded-full h-4">
              <div className="bg-gradient-to-r from-gold to-yellow-400 h-4 rounded-full" style={{ width: "5%" }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
