import { Header } from './header';
import { HeroSection } from './hero-section';
import { FeaturesSection } from './features-section';
import { HowItWorksSection } from './how-it-works-section';
import { StatsSection } from './stats-section';
import { TestimonialsSection } from './testimonials-section';
import { PricingSection } from './pricing-section';
import { FaqSection } from './faq-section';
import { CtaSection } from './cta-section';
import { Footer } from './footer';
import type { LandingPageProps } from '../types/landing-page';

export function LandingPage({ isAuthenticated }: LandingPageProps) {
  return (
    <div className="min-h-screen font-sans">
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <HeroSection isAuthenticated={isAuthenticated} />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}


