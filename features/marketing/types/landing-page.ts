export interface LandingPageProps {
  isAuthenticated: boolean;
}

export interface PrimaryCta {
  href: string;
  label: string;
}

export interface GetPrimaryCtaOptions {
  isAuthenticated: boolean;
}

/** Navigation link for header/footer */
export interface NavLink {
  href: string;
  label: string;
}

/** Header component props */
export interface HeaderProps {
  isAuthenticated: boolean;
}

/** Hero section props */
export interface HeroSectionProps {
  isAuthenticated: boolean;
}

/** Individual feature item */
export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/** Stats/social proof item */
export interface StatItem {
  value: string;
  label: string;
}

/** Testimonial item */
export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatarInitials: string;
}

/** FAQ item */
export interface FaqItem {
  question: string;
  answer: string;
}

/** Pricing tier for landing page display */
export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

/** Footer link group */
export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}
