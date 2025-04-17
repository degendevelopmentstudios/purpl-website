"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export default function NFTSections() {
  return (
    <section id="nft-airdrop" className="w-full overflow-hidden">
      <div className="cosmic-bg py-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 mb-6"
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold cosmic-text mb-6">NFT Airdrop</h2>
          
          <div className="flex justify-center mb-8">
            <Image 
              src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/DHN.png" 
              alt="DHN Logo" 
              width={200} 
              height={200} 
              className="rounded-full border-4 border-yellow-400 shadow-glow"
            />
          </div>

          <p className="text-center text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            9.1% of the total supply will be airdropped to NFT holders
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Degen Hoopers NFT Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl p-6 border border-purple-500/30 shadow-glow relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="mb-4 md:mb-0 md:mr-6">
                <Image 
                  src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/DHN.png" 
                  alt="Degen Hoopers NFT" 
                  width={120} 
                  height={120} 
                  className="rounded-lg border-2 border-purple-400"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold cosmic-text mb-2">Degen Hoopers NFT</h3>
                <p className="text-gray-300">Holders will receive PURPL tokens based on rarity tier</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 ml-4">
                <div className="flex items-center mb-2">
                  <Image 
                    src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/legendary.png" 
                    alt="Legendary NFT" 
                    width={80} 
                    height={80} 
                    className="rounded-md border border-yellow-400 mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-yellow-400">Legendary</h4>
                    <p className="text-gray-300">100,000 PURPL</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 ml-4">
                <div className="flex items-center mb-2">
                  <Image 
                    src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/epic.png" 
                    alt="Epic NFT" 
                    width={80} 
                    height={80} 
                    className="rounded-md border border-purple-400 mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-purple-400">Epic</h4>
                    <p className="text-gray-300">50,000 PURPL</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 ml-4">
                <div className="flex items-center mb-2">
                  <Image 
                    src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/rare.png" 
                    alt="Rare NFT" 
                    width={80} 
                    height={80} 
                    className="rounded-md border border-blue-400 mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-blue-400">Rare</h4>
                    <p className="text-gray-300">25,000 PURPL</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 ml-4">
                <div className="flex items-center mb-2">
                  <Image 
                    src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/uncommon.png" 
                    alt="Uncommon NFT" 
                    width={80} 
                    height={80} 
                    className="rounded-md border border-green-400 mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-green-400">Uncommon</h4>
                    <p className="text-gray-300">10,000 PURPL</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 ml-4">
                <div className="flex items-center mb-2">
                  <Image 
                    src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/common.png" 
                    alt="Common NFT" 
                    width={80} 
                    height={80} 
                    className="rounded-md border border-gray-400 mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-300">Common</h4>
                    <p className="text-gray-300">5,000 PURPL</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Memorial Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl p-6 border border-purple-500/30 shadow-glow relative overflow-hidden"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold cosmic-text mb-4">In Memory of Kobe & Gigi</h3>
              <div className="flex justify-center space-x-6">
                <div className="relative">
                  <Image 
                    src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/candle.png" 
                    alt="Memorial Candle" 
                    width={100} 
                    height={150} 
                    className="mx-auto"
                  />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-300 rounded-full animate-flicker opacity-75 blur-sm"></div>
                </div>
                <div className="relative">
                  <Image 
                    src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/candle.png" 
                    alt="Memorial Candle" 
                    width={100} 
                    height={150} 
                    className="mx-auto"
                  />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-300 rounded-full animate-flicker opacity-75 blur-sm"></div>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-gray-300 mb-4">
                8% of the total supply will be burned in memory of Kobe Bryant and his daughter Gianna.
              </p>
              <p className="text-gray-300">
                #8 and #24 jerseys, representing 8% of the total supply.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Image 
                src="https://purpltheoneish.mypinata.cloud/ipfs/QmYBzWCGwYRPDf7RSaKaQmgLLcThxWnNZrT8WnxgibHGrL/kobe.png" 
                alt="Kobe and Gigi" 
                width={200} 
                height={200} 
                className="rounded-lg border-2 border-yellow-400 shadow-glow"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
