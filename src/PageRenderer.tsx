import type { ComponentType } from "react";
import { ContentSectionBlock } from "./blocks/ContentSectionBlock";
import { FaqBlock } from "./blocks/FaqBlock";
import { GalleryBlock } from "./blocks/GalleryBlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { SplitContentBlock } from "./blocks/SplitContentBlock";
import { TestimonialsBlock } from "./blocks/TestimonialsBlock";
import { ThreeColumnsBlock } from "./blocks/ThreeColumnsBlock";

// Un bloque de página tal como se guarda en la base: su tipo, sus datos propios
// y, si el tipo lo admite, una lista de elementos repetibles (slides, columnas, preguntas…).
export type Bloque = {
  type: string;
  data: Record<string, unknown>;
  items?: Record<string, unknown>[];
};

export type Tema = { primary: string; text: string; muted: string };

type PropsDeBloque = { data: never; items?: Record<string, unknown>[] };

// Registro estático: el tipo guardado en la base decide qué componente dibuja el bloque.
// Un tipo desconocido no rompe la página: simplemente no se muestra.
export const REGISTRO: Record<string, ComponentType<PropsDeBloque>> = {
  hero: HeroBlock as ComponentType<PropsDeBloque>,
  content_section: ContentSectionBlock as ComponentType<PropsDeBloque>,
  gallery: GalleryBlock as ComponentType<PropsDeBloque>,
  split_content: SplitContentBlock as ComponentType<PropsDeBloque>,
  three_columns: ThreeColumnsBlock as ComponentType<PropsDeBloque>,
  faq: FaqBlock as ComponentType<PropsDeBloque>,
  testimonials: TestimonialsBlock as ComponentType<PropsDeBloque>,
};

export function bloquesVisibles(bloques: Bloque[]): Bloque[] {
  return bloques.filter((bloque) => bloque.type in REGISTRO);
}

export function PageRenderer({ bloques, tema }: { bloques: Bloque[]; tema: Tema }) {
  const estilo = {
    "--site-primary": tema.primary,
    "--site-secondary": tema.primary,
    "--site-text": tema.text,
    "--site-muted": tema.muted,
    "--site-radius": "0.9rem",
  } as React.CSSProperties;

  return (
    <main style={estilo}>
      {bloquesVisibles(bloques).map((bloque, indice) => {
        const Componente = REGISTRO[bloque.type];
        return <Componente key={indice} data={bloque.data as never} items={bloque.items ?? []} />;
      })}
    </main>
  );
}
