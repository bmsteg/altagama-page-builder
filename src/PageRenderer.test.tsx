import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PageRenderer, bloquesVisibles, type Bloque } from "./PageRenderer";
import ejemplo from "./pagina-ejemplo.json";

const tema = { primary: "#B08D2C", text: "#111", muted: "#555" };

describe("PageRenderer", () => {
  it("ignora los tipos de bloque que no están en el registro", () => {
    const bloques: Bloque[] = [
      { type: "content_section", data: { title: "Hola" } },
      { type: "tipo_inventado", data: {} },
    ];
    expect(bloquesVisibles(bloques).map((b) => b.type)).toEqual(["content_section"]);
  });

  it("dibuja el título y el texto de una sección de contenido", () => {
    const html = renderToStaticMarkup(
      <PageRenderer tema={tema} bloques={[{ type: "content_section", data: { title: "Formate en belleza", text: "Cursos cortos" } }]} />,
    );
    expect(html).toContain("Formate en belleza");
    expect(html).toContain("Cursos cortos");
  });

  it("dibuja todas las preguntas de un bloque de preguntas frecuentes", () => {
    const html = renderToStaticMarkup(
      <PageRenderer
        tema={tema}
        bloques={[{ type: "faq", data: { title: "Preguntas" }, items: [{ question: "¿Dan certificado?", answer: "Sí." }, { question: "¿Hacen envíos?", answer: "Sí." }] }]}
      />,
    );
    expect(html).toContain("¿Dan certificado?");
    expect(html).toContain("¿Hacen envíos?");
  });

  it("la página de ejemplo se dibuja completa sin errores", () => {
    const html = renderToStaticMarkup(<PageRenderer tema={ejemplo.tema} bloques={ejemplo.bloques as Bloque[]} />);
    expect(html.length).toBeGreaterThan(1000);
  });

  it("aplica los colores del tema como variables CSS", () => {
    const html = renderToStaticMarkup(<PageRenderer tema={tema} bloques={[]} />);
    expect(html).toContain("--site-primary:#B08D2C");
  });
});
