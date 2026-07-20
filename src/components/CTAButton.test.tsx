import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CTAButton } from './CTAButton';

describe('CTAButton', () => {
  it('renders a filled CTA as a link with the filled style', () => {
    render(<CTAButton variant="filled" href="/start">Get started</CTAButton>);
    const link = screen.getByRole('link', { name: 'Get started' });
    expect(link).toHaveAttribute('href', '/start');
    expect(link.className).toContain('bg-glow');
  });

  it('renders a ghost CTA with an outlined style', () => {
    render(<CTAButton variant="ghost" href="/learn">Learn more</CTAButton>);
    const link = screen.getByRole('link', { name: 'Learn more' });
    expect(link.className).toContain('border-cream');
  });
});
