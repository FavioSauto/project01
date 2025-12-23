import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { HeroSectionProps } from '@/features/marketing/types/landing-page';

export function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Organic Background Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary blob - top right */}
        <svg
          className="animate-blob-float absolute -right-32 -top-32 h-[500px] w-[500px] opacity-30"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="oklch(65% 0.12 10 / 0.4)"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.4,41.2C63.4,53.4,51,63.3,37.2,70.1C23.4,76.9,8.2,80.6,-6.1,78.9C-20.4,77.2,-33.8,70.1,-45.8,61.2C-57.8,52.3,-68.4,41.6,-75.2,28.4C-82,15.2,-85,-0.5,-82.1,-14.8C-79.2,-29.1,-70.4,-42,-58.6,-50.1C-46.8,-58.2,-32,-61.5,-18.4,-63.8C-4.8,-66.1,7.6,-67.4,20.8,-70.4C34,-73.4,48,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Secondary blob - left middle */}
        <svg
          className="animate-blob-float-reverse absolute -left-40 top-1/3 h-[600px] w-[600px] opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="oklch(85% 0.08 290 / 0.5)"
            d="M39.9,-65.7C52.1,-60.5,62.6,-50.3,70.4,-37.8C78.2,-25.3,83.3,-10.5,82.6,4.1C81.9,18.7,75.4,33.2,65.8,44.6C56.2,56,43.5,64.3,29.7,69.8C15.9,75.3,1,78,-14.4,77.5C-29.8,77,-45.7,73.3,-57.2,64.1C-68.7,54.9,-75.8,40.2,-79.3,24.8C-82.8,9.4,-82.7,-6.7,-78.1,-21.2C-73.5,-35.7,-64.4,-48.6,-52.2,-54.8C-40,-61,-24.7,-60.5,-10.8,-60.7C3.1,-60.9,15.8,-61.8,27.7,-70.9C39.6,-80,50.7,-97.3,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Tertiary blob - bottom right */}
        <svg
          className="animate-blob-float absolute -bottom-20 right-1/4 h-[400px] w-[400px] opacity-25"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animationDelay: '2s' }}
        >
          <path
            fill="oklch(88% 0.05 145 / 0.5)"
            d="M47.7,-79.1C62.3,-71.9,75.1,-60.4,82.8,-45.8C90.5,-31.2,93.1,-13.5,90.4,2.6C87.7,18.7,79.7,33.2,69.4,45.5C59.1,57.8,46.5,67.9,32.4,74.2C18.3,80.5,2.7,83,-13.2,81.4C-29.1,79.8,-45.3,74.1,-57.4,64.1C-69.5,54.1,-77.5,39.8,-81.4,24.4C-85.3,9,-85.1,-7.5,-80.4,-22.3C-75.7,-37.1,-66.5,-50.2,-54.1,-58.8C-41.7,-67.4,-26.1,-71.5,-10.3,-75C5.5,-78.5,21.1,-81.4,33.1,-86.3C45.1,-91.2,53.5,-98.1,47.7,-79.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center pt-16 text-center sm:pt-24 lg:pt-32">
        {/* Badge */}
        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <span className="h-2 w-2 animate-pulse-gentle rounded-full bg-primary" />
          <span className="text-sm font-medium text-primary">Your mindful yoga companion</span>
        </div>

        {/* Main Headline */}
        <h1
          className="animate-fade-in-up font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: '0.1s' }}
        >
          Find Your Flow,
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Track Your Growth
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          style={{ animationDelay: '0.2s' }}
        >
          A beautifully designed yoga tracking app that helps you build a consistent practice,
          celebrate your progress, and nurture your mind-body connection.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up mt-10 flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: '0.3s' }}
        >
          {isAuthenticated ? (
            <Button size="lg" asChild className="animate-pulse-gentle px-8 text-base">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button size="lg" asChild className="px-8 text-base shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30">
                <Link href="/sign-up">Start Your Journey Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 text-base">
                <Link href="#features">See How It Works</Link>
              </Button>
            </>
          )}
        </div>

        {/* Social Proof Mini */}
        <div
          className="animate-fade-in-up mt-12 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex -space-x-2">
            {['E', 'S', 'M', 'A', 'L'].map(function (initial, index) {
              return (
                <div
                  key={index}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-primary/80 to-accent/80 text-sm font-medium text-white"
                >
                  {initial}
                </div>
              );
            })}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-1 sm:justify-start">
              {[1, 2, 3, 4, 5].map(function (star) {
                return (
                  <svg key={star} className="h-4 w-4 fill-primary" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                );
              })}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Loved by <span className="font-semibold text-foreground">10,000+</span> yogis worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

