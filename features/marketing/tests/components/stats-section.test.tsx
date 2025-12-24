import { render, screen } from '@testing-library/react';
import { StatsSection } from '@/features/marketing/components/stats-section';

describe('StatsSection', () => {
  it('renders all stats', () => {
    render(<StatsSection />);
    
    expect(screen.getByText('10,000+')).toBeInTheDocument();
    expect(screen.getByText('Active Yogis')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Guided Sessions')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('Poses in Library')).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('App Store Rating')).toBeInTheDocument();
  });
});


