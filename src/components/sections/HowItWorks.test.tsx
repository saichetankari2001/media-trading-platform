import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HowItWorks } from './HowItWorks';

describe('HowItWorks', () => {
  it('renders all three steps in order', () => {
    render(<HowItWorks />);
    const steps = screen.getAllByRole('heading', { level: 3 });
    expect(steps.map((s) => s.textContent)).toEqual([
      'Connect your inventory',
      'Trade programmatically',
      'Track performance',
    ]);
  });
});
