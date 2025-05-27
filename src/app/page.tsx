import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />

      {/* Placeholder for Sprint 3 */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-card/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Contact & AI Chat</h2>
          <p className="text-muted-foreground">Coming in Sprint 3...</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
