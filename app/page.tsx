import Header from "../components/header"
import HeroSection from "../components/hero-section"
import AboutSection from "../components/about-section"
import TokenomicsSection from "../components/tokenomics-section"
import NFTSections from "@/components/nft-sections"
import RoadmapSection from "../components/roadmap-section"
import MemeSection from "../components/meme-section"
import Footer from "../components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <TokenomicsSection />
      <NFTSections />
      <RoadmapSection />
      <MemeSection />
      <Footer />
    </main>
  )
}
