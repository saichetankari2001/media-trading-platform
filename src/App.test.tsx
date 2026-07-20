import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the nav, hero headline, and every section in order', () => {
    render(<App />);
    expect(screen.getByText('Lumen Media')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /precision and poetry/i })).toBeInTheDocument();
    expect(screen.getByText(/trusted by leading publishers/i)).toBeInTheDocument();
    expect(screen.getByText('Programmatic Trading')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Connect your inventory' })).toBeInTheDocument();
    expect(screen.getByText(/lumen media\. all rights reserved/i)).toBeInTheDocument();
  });
});
