import { render, screen } from '@testing-library/react';
import { CtaSection } from '@/features/marketing/components/cta-section';

describe('CtaSection', () => {
  it('renders correctly', () => {
    render(<CtaSection />);
    
    expect(screen.getByText(/Ready to Transform Your Practice\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Your Free Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/View Pricing/i)).toBeInTheDocument();
  });
});

