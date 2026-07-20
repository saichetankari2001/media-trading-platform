interface FooterProps {
  modelAttribution?: string;
}

export function Footer({ modelAttribution }: FooterProps) {
  return (
    <footer className="bg-midnight px-8 py-10 text-xs text-cream/50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Lumen Media. All rights reserved.</span>
        <div className="flex gap-6">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </div>
      {modelAttribution && (
        <p data-testid="model-attribution" className="mx-auto mt-4 max-w-5xl">
          {modelAttribution}
        </p>
      )}
    </footer>
  );
}
