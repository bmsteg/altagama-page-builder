

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Body, Container, Heading, Section } from "./ui";

type FaqItem = { question?: string; answer?: string };

type Props = {
  data: { title?: string; text?: string };
  items?: Record<string, unknown>[];
};

// `<details>` nativo no anima la apertura (el contenido salta) — mismo
// patrón que veníamos resolviendo en Carta/CartDrawer, acá con la técnica
// de `grid-template-rows: 0fr → 1fr` (anima a un alto que no conocemos de
// antemano, sin medir nada por JS).
function FaqAccordionItem({ faq }: { faq: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[var(--site-radius)] border border-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-11 w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium text-[var(--site-text)]"
      >
        <span>{faq.question}</span>
        <ChevronDown
          size={18}
          className={"shrink-0 text-gray-400 transition-transform duration-200 " + (open ? "rotate-180" : "")}
        />
      </button>
      {faq.answer && (
        <div
          className="grid transition-[grid-template-rows] duration-200 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-4 text-gray-600">{faq.answer}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function FaqBlock({ data, items }: Props) {
  const faqs = ((items ?? []) as FaqItem[]).filter((item) => item.question);

  if (faqs.length === 0 && !data.title && !data.text) {
    return null;
  }

  return (
    <Section className="mc-faq">
      <Container className="max-w-2xl">
        {(data.title || data.text) && (
          <div className="mb-6 text-center md:mb-8">
            {data.title && <Heading>{data.title}</Heading>}
            {data.text && <Body className="mt-2">{data.text}</Body>}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <FaqAccordionItem key={index} faq={faq} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
