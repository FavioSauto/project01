import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PRICING_TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with your yoga journey',
    features: [
      'Track up to 1 practice per day',
      'Access to 15 basic poses',
      'Basic session timer',
      'Weekly progress summary',
      'Community challenges',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$5',
    period: '/month',
    description: 'For dedicated practitioners who want the full experience',
    features: [
      'Unlimited practice tracking',
      'Full pose library (200+ poses)',
      'Guided session flows',
      'Advanced analytics & insights',
      'Mood & wellness journaling',
      'Priority community features',
      'Offline access',
      'No ads, ever',
    ],
    cta: 'Start 7-Day Free Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-medium text-primary">Simple Pricing</span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Choose Your Path
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, upgrade when you are ready. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Annual Savings Note */}
        <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-secondary/50 px-4 py-2 text-sm">
          <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-muted-foreground">
            Save <span className="font-semibold text-foreground">2 months</span> with annual billing
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
          {PRICING_TIERS.map(function (tier) {
            return (
              <Card
                key={tier.name}
                className={`relative transition-all duration-300 ${
                  tier.highlighted
                    ? 'border-2 border-primary bg-card shadow-xl shadow-primary/10'
                    : 'border-border/50 bg-card/50 hover:border-border hover:shadow-lg'
                }`}
              >
                {tier.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 text-primary-foreground">
                    {tier.badge}
                  </Badge>
                )}

                <CardHeader className="pb-4 pt-8 text-center">
                  <h3 className="font-serif text-2xl font-semibold">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="font-serif text-5xl font-bold tracking-tight">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{tier.description}</p>
                </CardHeader>

                <CardContent className="pb-8">
                  {/* Features */}
                  <ul className="mb-8 space-y-3">
                    {tier.features.map(function (feature) {
                      return (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* CTA */}
                  <Button
                    asChild
                    className={`w-full ${tier.highlighted ? 'shadow-lg shadow-primary/25' : ''}`}
                    variant={tier.highlighted ? 'default' : 'outline'}
                    size="lg"
                  >
                    <Link href="/sign-up">{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure payment</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Made with love</span>
          </div>
        </div>
      </div>
    </section>
  );
}

