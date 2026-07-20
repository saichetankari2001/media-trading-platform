interface Feature {
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Programmatic Trading',
    description: 'Buy and sell inventory in real time across a unified, auction-driven marketplace.',
  },
  {
    title: 'Publisher Tools',
    description: 'Manage floors, deals, and inventory quality from a single publisher-facing console.',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Track fill rate, yield, and latency as they happen, not the next morning.',
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden take rates — every fee is itemized on every transaction.',
  },
];

export function Features() {
  return (
    <section className="bg-midnight px-8 py-20">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-cream/10 p-6">
            <h3 className="font-serif text-xl text-cream">{feature.title}</h3>
            <p className="mt-2 text-sm text-cream/70">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
