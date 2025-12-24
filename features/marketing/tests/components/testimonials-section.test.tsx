import { render, screen } from '@testing-library/react';
import { TestimonialsSection } from '@/features/marketing/components/testimonials-section';

describe('TestimonialsSection', () => {
  it('renders all testimonials', () => {
    render(<TestimonialsSection />);
    
    expect(screen.getByText(/What Our Community Says/i)).toBeInTheDocument();
    
    expect(screen.getByText('Emma Richardson')).toBeInTheDocument();
    expect(screen.getByText('Practicing for 8 months')).toBeInTheDocument();
    expect(screen.getByText(/transformed my practice/i)).toBeInTheDocument();
    
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Practicing for 1 year')).toBeInTheDocument();
    expect(screen.getByText(/guided sessions fit perfectly/i)).toBeInTheDocument();
    
    expect(screen.getByText('Maya Patel')).toBeInTheDocument();
    expect(screen.getByText('Practicing for 6 months')).toBeInTheDocument();
    expect(screen.getByText(/Asana Flow feels different/i)).toBeInTheDocument();
  });
});


