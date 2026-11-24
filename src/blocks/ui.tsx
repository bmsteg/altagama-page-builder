import type { ReactNode } from "react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={"w-full px-4 py-7 md:py-12 " + className}>{children}</section>;
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={"mx-auto w-full max-w-[var(--site-content-width,72rem)] " + className}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--site-secondary)]">
      {children}
    </p>
  );
}

export function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={"text-3xl font-bold tracking-tight text-[var(--site-text)] md:text-4xl " + className}>
      {children}
    </h2>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={"text-base leading-relaxed text-[var(--site-muted)] md:text-lg " + className}>{children}</p>;
}

export function CtaButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="mt-2 inline-flex min-h-11 items-center justify-center rounded-[var(--site-radius)] bg-[var(--site-primary)] px-6 py-3 text-center font-medium text-white transition hover:opacity-90"
    >
      {children}
    </a>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"rounded-[var(--site-radius)] border border-black/10 bg-white p-6 " + className}>
      {children}
    </div>
  );
}

export function gridColsClass(count: number): string {
  if (count <= 1) return "grid-cols-1 max-w-md mx-auto";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  return "grid-cols-2 md:grid-cols-4";
}
