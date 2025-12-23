import { getPrimaryCta } from '@/features/marketing/utils/get-primary-cta';

describe('getPrimaryCta', function describeGetPrimaryCta() {
  it('returns a dashboard CTA when authenticated', function itReturnsDashboardCtaWhenAuthenticated() {
    const cta = getPrimaryCta({ isAuthenticated: true });

    expect(cta).toEqual({
      href: '/dashboard',
      label: 'Go to dashboard',
    });
  });

  it('returns a sign-up CTA when unauthenticated', function itReturnsSignUpCtaWhenUnauthenticated() {
    const cta = getPrimaryCta({ isAuthenticated: false });

    expect(cta).toEqual({
      href: '/sign-up',
      label: 'Start tracking',
    });
  });
});





