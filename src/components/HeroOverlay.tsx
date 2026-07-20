import { ScrollCue } from './ScrollCue';

export function HeroOverlay() {
  return (
    <div className="relative flex h-full flex-col items-start justify-center px-8 md:px-16">
      <h1 className="max-w-xl font-serif text-4xl leading-tight text-cream md:text-6xl">
        Precision and poetry, in the same product.
      </h1>
      <p className="mt-4 max-w-md font-sans text-base text-cream/80 md:text-lg">
        A programmatic trading platform for publishers who care as much about
        craft as they do about performance.
      </p>
      <ScrollCue />
    </div>
  );
}
