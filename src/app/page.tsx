import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ChatBot } from '@/components/interactive/ChatBot'
import { GitHubSimulator } from '@/components/interactive/GitHubSimulator'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />

      {/* GitHub Commit Simulator Section */}
      <section className="py-20 px-6">
        <GitHubSimulator />
      </section>

      <ContactSection />
      <Footer />

      {/* Interactive Components */}
      <ChatBot />
    </main>
  )
}
