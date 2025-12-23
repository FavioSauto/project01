import type { StatItem } from '@/features/marketing/types/landing-page';

const STATS: StatItem[] = [
  { value: '10,000+', label: 'Active Yogis' },
  { value: '500+', label: 'Guided Sessions' },
  { value: '200+', label: 'Poses in Library' },
  { value: '4.9', label: 'App Store Rating' },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 px-4 py-16 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute -left-20 top-0 h-64 w-64 opacity-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            className="text-primary"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.4,41.2C63.4,53.4,51,63.3,37.2,70.1C23.4,76.9,8.2,80.6,-6.1,78.9C-20.4,77.2,-33.8,70.1,-45.8,61.2C-57.8,52.3,-68.4,41.6,-75.2,28.4C-82,15.2,-85,-0.5,-82.1,-14.8C-79.2,-29.1,-70.4,-42,-58.6,-50.1C-46.8,-58.2,-32,-61.5,-18.4,-63.8C-4.8,-66.1,7.6,-67.4,20.8,-70.4C34,-73.4,48,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute -right-20 bottom-0 h-64 w-64 opacity-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            className="text-accent"
            d="M39.9,-65.7C52.1,-60.5,62.6,-50.3,70.4,-37.8C78.2,-25.3,83.3,-10.5,82.6,4.1C81.9,18.7,75.4,33.2,65.8,44.6C56.2,56,43.5,64.3,29.7,69.8C15.9,75.3,1,78,-14.4,77.5C-29.8,77,-45.7,73.3,-57.2,64.1C-68.7,54.9,-75.8,40.2,-79.3,24.8C-82.8,9.4,-82.7,-6.7,-78.1,-21.2C-73.5,-35.7,-64.4,-48.6,-52.2,-54.8C-40,-61,-24.7,-60.5,-10.8,-60.7C3.1,-60.9,15.8,-61.8,27.7,-70.9C39.6,-80,50.7,-97.3,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map(function (stat) {
            return (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

