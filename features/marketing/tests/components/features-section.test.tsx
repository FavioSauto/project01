import { render, screen } from '@testing-library/react';
import { FeaturesSection } from '@/features/marketing/components/features-section';

describe('FeaturesSection', () => {
  it('renders all features', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/Your Complete Yoga Companion/i)).toBeInTheDocument();
    expect(screen.getByText(/Practice Tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/Progress Visualization/i)).toBeInTheDocument();
    expect(screen.getByText(/Pose Library/i)).toBeInTheDocument();
    expect(screen.getByText(/Guided Sessions/i)).toBeInTheDocument();
    expect(screen.getByText(/Wellness Journal/i)).toBeInTheDocument();
    expect(screen.getByText(/Community Challenges/i)).toBeInTheDocument();
  });
});

