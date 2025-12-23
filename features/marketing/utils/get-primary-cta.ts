import type { GetPrimaryCtaOptions, PrimaryCta } from '@/features/marketing/types/landing-page';

export function getPrimaryCta(options: GetPrimaryCtaOptions): PrimaryCta {
  if (options.isAuthenticated) {
    return {
      href: '/dashboard',
      label: 'Go to dashboard',
    };
  }

  return {
    href: '/sign-up',
    label: 'Start tracking',
  };
}





