interface Step {
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    title: 'Connect your inventory',
    description: 'Point your ad server or CMS at our SDK — no migration required.',
  },
  {
    title: 'Trade programmatically',
    description: 'Buyers bid in real time; floors and deal terms stay under your control.',
  },
  {
    title: 'Track performance',
    description: 'Watch yield, fill, and latency update live from the same dashboard.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-violet px-8 py-20" id="how-it-works">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row">
        {STEPS.map((step, index) => (
          <div key={step.title} className="flex-1">
            <span className="font-serif text-3xl text-glow">{index + 1}</span>
            <h3 className="mt-3 font-serif text-xl text-cream">{step.title}</h3>
            <p className="mt-2 text-sm text-cream/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
