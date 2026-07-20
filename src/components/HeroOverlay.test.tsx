import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroOverlay } from './HeroOverlay';

describe('HeroOverlay', () => {
  it('renders the headline and subhead', () => {
    render(<HeroOverlay />);
    expect(
      screen.getByRole('heading', { name: /precision and poetry/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/programmatic trading/i)).toBeInTheDocument();
  });
});
