import { getSession } from '@/lib/session-helpers';
import { Header } from '@/features/marketing/components/header';
import { HeroSection } from '@/features/marketing/components/hero-section';
import { FeaturesSection } from '@/features/marketing/components/features-section';
import { HowItWorksSection } from '@/features/marketing/components/how-it-works-section';
import { StatsSection } from '@/features/marketing/components/stats-section';
import { TestimonialsSection } from '@/features/marketing/components/testimonials-section';
import { PricingSection } from '@/features/marketing/components/pricing-section';
import { FaqSection } from '@/features/marketing/components/faq-section';
import { CtaSection } from '@/features/marketing/components/cta-section';
import { Footer } from '@/features/marketing/components/footer';

export default async function Home() {
  const session = await getSession();
  const isAuthenticated = !!session?.user;

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
