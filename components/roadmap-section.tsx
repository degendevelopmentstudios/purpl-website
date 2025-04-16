"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function RoadmapSection() {
  const isMobile = useMobile()

  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Launch & Distribution",
      items: ["Token Launch", "Token Airdrop", "NFTs Minted", "NFT Airdrop"],
    },
    {
      phase: "Phase 2",
      title: "Connectivity & Rewards",
      items: ["Project DeLorean Connectivity", "Staking Pools", "Staking Rewards", "Community Events"],
    },
    {
      phase: "Phase 3",
      title: "Expansion & Engagement",
      items: ["Games Development", "Ecosystem Expansion", "Partnerships", "Community Governance"],
    },
    {
      phase: "Phase 4",
      title: "Global Domination",
      items: ["Exchange Listings", "Project Big Horn", "Community Initiatives", "Global Marketing Campaign"],
    },
  ]

  // Mobile-optimized roadmap
  if (isMobile) {
    return (
      <section id="roadmap" className="py-12 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-comic font-bold mb-4 cosmic-text">Roadmap</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purpl to-cosmic mx-auto mb-6"></div>
            <p className="text-xl text-purpl-light max-w-2xl mx-auto">
              Our journey to the moon and beyond is just beginning. Here's our magical path forward!
            </p>
          </motion.div>

          <div className="space-y-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 bg-purpl rounded-full border-4 border-gold flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-bold">{index + 1}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-comic font-bold text-gold">{item.phase}</h3>
                    <h4 className="text-lg font-comic font-bold text-purpl-light">{item.title}</h4>
                  </div>
                </div>

                <div className="ml-6 pl-10 border-l-2 border-purpl">
                  <div className="p-4 rounded-xl bg-cosmic-dark bg-opacity-50 border border-purpl">
                    <ul className="space-y-2">
                      {item.items.map((listItem, i) => (
                        <li key={i} className="flex items-center gap-2 text-white">
                          <span className="inline-block w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
                          <span>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop version (original)
  return (
    <section id="roadmap" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-comic font-bold mb-4 cosmic-text">Roadmap</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purpl to-cosmic mx-auto mb-6"></div>
          <p className="text-xl text-purpl-light max-w-2xl mx-auto">
            Our journey to the moon and beyond is just beginning. Here's our magical path forward!
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purpl to-cosmic-dark"></div>

          <div className="space-y-24">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-1/2 px-8">
                    <div
                      className={`p-6 rounded-2xl border-2 border-purpl bg-cosmic-dark bg-opacity-50 ${index % 2 === 0 ? "text-right" : "text-left"}`}
                    >
                      <h3 className="text-xl font-comic font-bold text-gold mb-1">{item.phase}</h3>
                      <h4 className="text-2xl font-comic font-bold text-purpl-light mb-4">{item.title}</h4>
                      <ul className={`space-y-2 ${index % 2 === 0 ? "ml-auto" : ""}`}>
                        {item.items.map((listItem, i) => (
                          <li key={i} className="flex items-center gap-2 text-white">
                            <span className="inline-block w-2 h-2 bg-gold rounded-full"></span>
                            <span>{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-purpl rounded-full border-4 border-gold flex items-center justify-center">
                    <span className="text-gold font-bold">{index + 1}</span>
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
