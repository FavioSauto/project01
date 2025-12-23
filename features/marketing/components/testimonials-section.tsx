import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { TestimonialItem } from '@/features/marketing/types/landing-page';

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Asana Flow completely transformed my practice. The tracking features keep me accountable, and watching my progress over months has been incredibly motivating. I've never stuck with yoga this long before!",
    author: 'Emma Richardson',
    role: 'Practicing for 8 months',
    avatarInitials: 'ER',
  },
  {
    quote: "As a busy mom, I needed something flexible. The guided sessions fit perfectly into my schedule, and the mood tracking helped me realize how much yoga impacts my mental wellbeing. Truly life-changing.",
    author: 'Sarah Chen',
    role: 'Practicing for 1 year',
    avatarInitials: 'SC',
  },
  {
    quote: "I was skeptical about tracking apps, but Asana Flow feels different. It's not about pushing harder—it's about understanding your body better. The pose library and gentle reminders make it feel like having a supportive friend.",
    author: 'Maya Patel',
    role: 'Practicing for 6 months',
    avatarInitials: 'MP',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      {/* Top accent line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-medium text-primary">Loved by Yogis</span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Community Says
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of practitioners who have transformed their yoga journey with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map(function (testimonial) {
            return (
              <Card
                key={testimonial.author}
                className="group relative border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
              >
                {/* Quote mark decoration */}
                <div className="absolute -top-4 left-6 text-6xl font-serif text-primary/20">"</div>

                <CardContent className="p-6 pt-8">
                  {/* Stars */}
                  <div className="mb-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map(function (star) {
                      return (
                        <svg key={star} className="h-4 w-4 fill-primary" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      );
                    })}
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-6 text-muted-foreground">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-medium">
                        {testimonial.avatarInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

