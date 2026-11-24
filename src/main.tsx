import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PageRenderer, type Bloque } from "./PageRenderer";
import ejemplo from "./pagina-ejemplo.json";

// La demo lee una página guardada como JSON (en la plataforma real viene de PostgreSQL).
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PageRenderer tema={ejemplo.tema} bloques={ejemplo.bloques as Bloque[]} />
  </StrictMode>,
);
