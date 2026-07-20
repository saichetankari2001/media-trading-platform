import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TrustStrip } from './TrustStrip';

describe('TrustStrip', () => {
  it('renders the trust heading and four placeholder publisher names', () => {
    render(<TrustStrip />);
    expect(screen.getByText(/trusted by leading publishers/i)).toBeInTheDocument();
    expect(screen.getByText('Northwind Media')).toBeInTheDocument();
    expect(screen.getByText('Solstice Publishing')).toBeInTheDocument();
    expect(screen.getByText('Harbor & Co.')).toBeInTheDocument();
    expect(screen.getByText('Fieldstone Group')).toBeInTheDocument();
  });
});
