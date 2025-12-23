'use client';

import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { FaqItem } from '@/features/marketing/types/landing-page';

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is Asana Flow suitable for beginners?',
    answer: 'Absolutely! Asana Flow is designed for all levels, from complete beginners to advanced practitioners. Our pose library includes modifications for every ability level, and our guided sessions start with foundational practices that build gradually.',
  },
  {
    question: 'Can I use the app offline?',
    answer: 'Yes! Pro subscribers can download sessions and access the pose library offline. Your practice data syncs automatically when you reconnect, so you can practice anywhere—even on a mountaintop retreat.',
  },
  {
    question: 'How does the free trial work?',
    answer: 'Start with our generous free tier forever, or try Pro free for 7 days. No credit card required for the free tier. For the Pro trial, you can cancel anytime before it ends and you won\'t be charged.',
  },
  {
    question: 'What makes Asana Flow different from other yoga apps?',
    answer: 'We focus on the whole journey, not just individual sessions. Our unique combination of practice tracking, wellness journaling, and progress visualization helps you build a sustainable practice. Plus, our feminine-forward design creates a calming, welcoming space.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your Pro subscription at any time with no questions asked. You\'ll continue to have access to Pro features until the end of your billing period, then automatically switch to the free tier.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a full refund within 30 days of your first Pro subscription payment if you\'re not completely satisfied. Just reach out to our support team and we\'ll take care of it.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="relative bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      {/* Top accent */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-medium text-primary">Common Questions</span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about Asana Flow
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mt-12 space-y-4">
          {FAQ_ITEMS.map(function (item, index) {
            const isOpen = openIndex === index;

            return (
              <Collapsible
                key={index}
                open={isOpen}
                onOpenChange={function () { handleToggle(index); }}
              >
                <div className={`rounded-xl border transition-all duration-200 ${isOpen ? 'border-primary/30 bg-card shadow-sm' : 'border-border/50 bg-card/50'}`}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-5 text-left">
                    <span className="font-medium pr-4">{item.question}</span>
                    <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${isOpen ? 'bg-primary text-primary-foreground rotate-180' : 'bg-muted'}`}>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-5 pb-5 text-muted-foreground">
                      {item.answer}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{' '}
            <a href="mailto:hello@asanaflow.app" className="font-medium text-primary underline-offset-4 hover:underline">
              We would love to help
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

