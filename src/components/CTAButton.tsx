import type { ReactNode } from 'react';

interface CTAButtonProps {
  children: ReactNode;
  variant: 'filled' | 'ghost';
  href: string;
}

export function CTAButton({ children, variant, href }: CTAButtonProps) {
  const base = 'rounded-full px-6 py-2.5 text-sm font-semibold transition-colors';
  const styles =
    variant === 'filled'
      ? `${base} bg-glow text-midnight shadow-[0_0_20px_theme(colors.glow/60%)] hover:bg-lavender`
      : `${base} border border-cream/70 text-cream hover:bg-cream/10`;

  return (
    <a href={href} className={styles}>
      {children}
    </a>
  );
}
