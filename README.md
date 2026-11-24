# Page Builder por bloques · Alta Gama

Parte del sistema de páginas de **[Alta Gama](https://altagama.com.ar)**, mi plataforma de sitios y tiendas online. Separé el renderizador y algunos bloques para mostrarlos como proyecto independiente.

En la plataforma, cada página de cada negocio se guarda en PostgreSQL como una **lista de bloques**: el tipo, sus datos propios y, si el tipo lo admite, sus elementos repetibles (slides, columnas, preguntas…). El dueño del negocio arma y edita su página desde el panel, sin tocar código, y el sitio la dibuja con estos componentes.

![Captura de la demo](captura.webp)

## Qué muestra

- **Registro estático de tipos de bloque** (`src/PageRenderer.tsx`): el tipo guardado decide qué componente se dibuja. Un tipo desconocido no rompe la página.
- **Temas por negocio con variables CSS**: cada sitio tiene sus colores, y los bloques los toman de `--site-primary`, `--site-text`, etc.
- **Bloques reales de la plataforma** (`src/blocks/`): hero con carrusel, sección de contenido, galería, foto con texto, tres columnas (con variantes de estadísticas y de imagen), testimonios y preguntas frecuentes.
- **Responsive y accesible**: carrusel con [Embla](https://www.embla-carousel.com/), íconos de [Lucide](https://lucide.dev/), carga de imágenes con skeleton y respeto por `prefers-reduced-motion`.
- **Tests** con Vitest.

La página de ejemplo (`src/pagina-ejemplo.json`) es la portada real de una academia que corre sobre la plataforma: [nuevadermo.com.ar](https://nuevadermo.com.ar).

## Correrlo

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm test
pnpm build
```

## Stack

React 19 · TypeScript · Tailwind CSS 4 · Vite · Vitest · Embla Carousel · Lucide

---

© 2026 Brian Stegman. Todos los derechos reservados. El código se publica solo para que se pueda ver; no se otorga licencia de uso.
