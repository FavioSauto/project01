import { render, screen } from '@testing-library/react';
import { PricingSection } from '@/features/marketing/components/pricing-section';

describe('PricingSection', () => {
  it('renders all pricing tiers', () => {
    render(<PricingSection />);
    
    expect(screen.getByText(/Choose Your Path/i)).toBeInTheDocument();
    
    // Free Tier
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('Start Free')).toBeInTheDocument();
    
    // Pro Tier
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('$5')).toBeInTheDocument();
    expect(screen.getByText('Start 7-Day Free Trial')).toBeInTheDocument();
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders features for each tier', () => {
    render(<PricingSection />);
    
    expect(screen.getByText('Track up to 1 practice per day')).toBeInTheDocument();
    expect(screen.getByText('Unlimited practice tracking')).toBeInTheDocument();
    expect(screen.getByText('Offline access')).toBeInTheDocument();
  });
});

