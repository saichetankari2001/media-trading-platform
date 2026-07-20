import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders legal text without an attribution line by default', () => {
    render(<Footer />);
    expect(screen.getByText(/lumen media/i)).toBeInTheDocument();
    expect(screen.queryByTestId('model-attribution')).not.toBeInTheDocument();
  });

  it('renders the model attribution line when provided', () => {
    render(<Footer modelAttribution="Hummingbird model by Jane Doe (CC BY 4.0)" />);
    expect(screen.getByTestId('model-attribution')).toHaveTextContent(
      'Hummingbird model by Jane Doe (CC BY 4.0)'
    );
  });
});
