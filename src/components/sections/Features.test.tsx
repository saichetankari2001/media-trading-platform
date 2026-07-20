import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Features } from './Features';

describe('Features', () => {
  it('renders all four feature cards', () => {
    render(<Features />);
    expect(screen.getByText('Programmatic Trading')).toBeInTheDocument();
    expect(screen.getByText('Publisher Tools')).toBeInTheDocument();
    expect(screen.getByText('Real-Time Analytics')).toBeInTheDocument();
    expect(screen.getByText('Transparent Pricing')).toBeInTheDocument();
  });
});
