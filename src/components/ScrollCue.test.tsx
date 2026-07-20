import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollCue } from './ScrollCue';

describe('ScrollCue', () => {
  it('renders the discovery prompt', () => {
    render(<ScrollCue />);
    expect(screen.getByText(/scroll down and discover/i)).toBeInTheDocument();
  });
});
