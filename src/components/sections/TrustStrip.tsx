const PLACEHOLDER_PUBLISHERS = [
  'Northwind Media',
  'Solstice Publishing',
  'Harbor & Co.',
  'Fieldstone Group',
];

export function TrustStrip() {
  return (
    <section className="border-y border-cream/10 bg-violet px-8 py-10 text-center">
      <p className="text-xs uppercase tracking-widest text-cream/60">
        Trusted by leading publishers
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {PLACEHOLDER_PUBLISHERS.map((name) => (
          <li key={name} className="font-serif text-lg text-cream/70">
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
