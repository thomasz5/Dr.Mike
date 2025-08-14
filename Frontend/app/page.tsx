import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { DemoSection } from "@/components/sections/demo-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
