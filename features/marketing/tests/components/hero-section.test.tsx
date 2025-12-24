import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/features/marketing/components/hero-section';

describe('HeroSection', () => {
  it('renders correctly when unauthenticated', () => {
    render(<HeroSection isAuthenticated={false} />);
    
    expect(screen.getByText(/Find Your Flow/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Your Journey Free/i)).toBeInTheDocument();
    expect(screen.getByText(/See How It Works/i)).toBeInTheDocument();
    expect(screen.queryByText(/Go to Dashboard/i)).not.toBeInTheDocument();
  });

  it('renders correctly when authenticated', () => {
    render(<HeroSection isAuthenticated={true} />);
    
    expect(screen.getByText(/Find Your Flow/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Dashboard/i)).toBeInTheDocument();
    expect(screen.queryByText(/Start Your Journey Free/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/See How It Works/i)).not.toBeInTheDocument();
  });

  it('renders social proof section', () => {
    render(<HeroSection isAuthenticated={false} />);
    expect(screen.getByText(/10,000\+/i)).toBeInTheDocument();
    expect(screen.getByText(/yogis worldwide/i)).toBeInTheDocument();
  });
});


