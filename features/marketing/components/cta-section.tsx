import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Gradient Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />

      {/* Organic blob decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="animate-blob-float absolute -left-20 top-1/4 h-64 w-64 opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="oklch(65% 0.12 10 / 0.5)"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.4,41.2C63.4,53.4,51,63.3,37.2,70.1C23.4,76.9,8.2,80.6,-6.1,78.9C-20.4,77.2,-33.8,70.1,-45.8,61.2C-57.8,52.3,-68.4,41.6,-75.2,28.4C-82,15.2,-85,-0.5,-82.1,-14.8C-79.2,-29.1,-70.4,-42,-58.6,-50.1C-46.8,-58.2,-32,-61.5,-18.4,-63.8C-4.8,-66.1,7.6,-67.4,20.8,-70.4C34,-73.4,48,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="animate-blob-float-reverse absolute -right-20 bottom-1/4 h-80 w-80 opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="oklch(85% 0.08 290 / 0.5)"
            d="M39.9,-65.7C52.1,-60.5,62.6,-50.3,70.4,-37.8C78.2,-25.3,83.3,-10.5,82.6,4.1C81.9,18.7,75.4,33.2,65.8,44.6C56.2,56,43.5,64.3,29.7,69.8C15.9,75.3,1,78,-14.4,77.5C-29.8,77,-45.7,73.3,-57.2,64.1C-68.7,54.9,-75.8,40.2,-79.3,24.8C-82.8,9.4,-82.7,-6.7,-78.1,-21.2C-73.5,-35.7,-64.4,-48.6,-52.2,-54.8C-40,-61,-24.7,-60.5,-10.8,-60.7C3.1,-60.9,15.8,-61.8,27.7,-70.9C39.6,-80,50.7,-97.3,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Ready to Transform Your Practice?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Join thousands of yogis who have found their flow with Asana Flow. 
          Start your journey today — completely free.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="px-8 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <Link href="/sign-up">Start Your Free Journey</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="px-8 text-base">
            <Link href="#pricing">View Pricing</Link>
          </Button>
        </div>

        {/* Trust note */}
        <p className="mt-8 text-sm text-muted-foreground">
          No credit card required · Free forever tier · Cancel anytime
        </p>
      </div>
    </section>
  );
}

