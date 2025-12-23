import { render, screen } from '@testing-library/react';
import React from 'react';

import { LandingPage } from '@/features/marketing/components/landing-page';

jest.mock('next/link', function mockNextLink() {
  function NextLink(props: any) {
    const { href, children, ...rest } = props;
    return (
      <a href={typeof href === 'string' ? href : href?.pathname} {...rest}>
        {children}
      </a>
    );
  }

  return {
    __esModule: true,
    default: NextLink,
  };
});

function getLinkHrefsByName(name: RegExp): string[] {
  const links = screen.queryAllByRole('link', { name });
  const hrefs: string[] = [];

  for (const link of links) {
    hrefs.push(link.getAttribute('href') ?? '');
  }

  return hrefs;
}

describe('LandingPage', function describeLandingPage() {
  it('renders key sections', function itRendersKeySections() {
    render(<LandingPage isAuthenticated={false} />);

    expect(screen.getByRole('heading', { name: /Your Complete Yoga Companion/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /How It Works/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /What Our Community Says/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Choose Your Path/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument();
  });

  it('routes the primary CTA to sign up when signed out', function itRoutesPrimaryCtaToSignUpWhenSignedOut() {
    render(<LandingPage isAuthenticated={false} />);

    expect(getLinkHrefsByName(/Start Your Journey Free/i)).toContain('/sign-up');
  });

  it('routes the primary CTA to dashboard when signed in', function itRoutesPrimaryCtaToDashboardWhenSignedIn() {
    render(<LandingPage isAuthenticated />);

    expect(getLinkHrefsByName(/go to dashboard/i)).toContain('/dashboard');
  });
});





