const STEPS = [
  {
    number: '01',
    title: 'Set Your Intentions',
    description: 'Define your yoga goals, choose your focus areas, and set a practice schedule that fits your lifestyle.',
    accent: 'from-primary to-primary/60',
  },
  {
    number: '02',
    title: 'Follow Guided Sessions',
    description: 'Practice with our curated flows, pose library, and customizable timers designed for all experience levels.',
    accent: 'from-accent to-accent/60',
  },
  {
    number: '03',
    title: 'Track Your Transformation',
    description: 'Watch your progress unfold with beautiful insights, celebrate milestones, and deepen your practice over time.',
    accent: 'from-secondary to-secondary/60',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-primary/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-medium text-primary">Simple Process</span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Begin your mindful journey in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {STEPS.map(function (step, index) {
            return (
              <div
                key={step.number}
                className="group relative"
              >
                {/* Connector line (hidden on mobile) */}
                {index < STEPS.length && (
                  <div className="absolute left-1/2 top-12 hidden h-px w-full -translate-x-1/2 lg:block">
                    <div className="h-full w-full bg-gradient-to-r from-border via-primary/30 to-border" />
                  </div>
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Step Number */}
                  <div className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${step.accent} p-[2px]`}>
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                      <span className="font-serif text-2xl font-bold text-foreground">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 font-serif text-xl font-semibold">{step.title}</h3>
                  <p className="max-w-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

