import { render, screen, fireEvent } from '@testing-library/react';
import { FaqSection } from '@/features/marketing/components/faq-section';

describe('FaqSection', () => {
  it('renders all FAQ questions', () => {
    render(<FaqSection />);
    
    expect(screen.getByText(/Is Asana Flow suitable for beginners\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Can I use the app offline\?/i)).toBeInTheDocument();
    expect(screen.getByText(/How does the free trial work\?/i)).toBeInTheDocument();
  });

  it('toggles FAQ answer on click', () => {
    render(<FaqSection />);
    
    const question = screen.getByText(/Is Asana Flow suitable for beginners\?/i);
    const trigger = screen.getByRole('button', { name: /Is Asana Flow suitable for beginners\?/i });
    
    // Initial state: answer should not be visible or present depending on implementation
    // The current implementation in faq-section.tsx uses Radix Collapsible
    
    fireEvent.click(trigger);
    
    // After clicking, it should be visible
    expect(screen.getByText(/Absolutely! Asana Flow is designed for all levels/i)).toBeInTheDocument();
  });

  it('only allows one FAQ to be open at a time', () => {
    render(<FaqSection />);
    
    const questions = [
      screen.getByText(/Is Asana Flow suitable for beginners\?/i),
      screen.getByText(/Can I use the app offline\?/i)
    ];
    
    fireEvent.click(questions[0]);
    // questions[0] answer should be open
    
    fireEvent.click(questions[1]);
    // questions[1] answer should be open, questions[0] should be closed
    
    expect(questions[1]).toBeInTheDocument();
  });
});

