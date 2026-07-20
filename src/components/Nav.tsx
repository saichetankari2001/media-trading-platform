import { useState } from 'react';
import { CTAButton } from './CTAButton';

export function Nav() {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-3 backdrop-blur-md bg-midnight/40">
      <span className="font-serif text-lg text-cream">Lumen Media</span>

      <div className="relative flex items-center gap-6">
        <button
          type="button"
          onClick={() => setProductsOpen((open) => !open)}
          className="rounded-full px-4 py-1.5 text-sm text-cream/90 hover:bg-cream/10"
        >
          Products
        </button>
        {productsOpen && (
          <div className="absolute left-0 top-10 flex flex-col gap-1 rounded-2xl bg-violet/95 p-3 shadow-xl">
            <a href="#publisher-tools" className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-cream/90 hover:bg-cream/10">
              Publisher Tools
            </a>
            <a href="#trading-desk" className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-cream/90 hover:bg-cream/10">
              Trading Desk
            </a>
          </div>
        )}

        <div className="flex items-center gap-3">
          <CTAButton variant="ghost" href="#how-it-works">
            See how it works
          </CTAButton>
          <CTAButton variant="filled" href="#request-access">
            Request access
          </CTAButton>
        </div>
      </div>
    </nav>
  );
}
