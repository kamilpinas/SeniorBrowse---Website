import ScrollProgress from './components/ScrollProgress'
import Topbar from './components/Topbar'
import Hero from './components/Hero'
import BeforeAfter from './components/BeforeAfter'
import FounderNote from './components/FounderNote'
import SeeItInAction from './components/SeeItInAction'
import Safety from './components/Safety'
import SetupSteps from './components/SetupSteps'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis()

  return (
    <>
      <ScrollProgress />
      <Topbar />
      <Hero />
      <SeeItInAction />
      <BeforeAfter />
      <FounderNote />
      <Safety />
      <SetupSteps />
      <FAQ />
      <Pricing />
      <FinalCTA />
    </>
  )
}
