import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders both CTAs', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /request access/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see how it works/i })).toBeInTheDocument();
  });

  it('toggles the products dropdown on click', () => {
    render(<Nav />);
    const trigger = screen.getByRole('button', { name: /products/i });
    expect(screen.queryByText(/publisher tools/i)).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByText(/publisher tools/i)).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText(/publisher tools/i)).not.toBeInTheDocument();
  });

  it('hides secondary CTA on mobile with responsive classes', () => {
    const { container } = render(<Nav />);
    const seeCTALink = screen.getByRole('link', { name: /see how it works/i });
    const wrapper = seeCTALink.closest('span');

    expect(wrapper).toHaveClass('hidden');
    expect(wrapper).toHaveClass('sm:inline-flex');
  });
});
