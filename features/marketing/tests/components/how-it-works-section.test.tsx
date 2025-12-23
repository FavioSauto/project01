import { render, screen } from '@testing-library/react';
import { HowItWorksSection } from '@/features/marketing/components/how-it-works-section';

describe('HowItWorksSection', () => {
  it('renders all steps', () => {
    render(<HowItWorksSection />);
    
    expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
    expect(screen.getByText(/Set Your Intentions/i)).toBeInTheDocument();
    expect(screen.getByText(/Follow Guided Sessions/i)).toBeInTheDocument();
    expect(screen.getByText(/Track Your Transformation/i)).toBeInTheDocument();
    
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });
});

