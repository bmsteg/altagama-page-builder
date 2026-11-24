

import { SiteIconClient } from "./SiteIconClient";

export const SITE_ICON_OPTIONS = [
  { value: "graduation-cap", label: "Graduación" },
  { value: "badge-check", label: "Sello verificado" },
  { value: "heart-handshake", label: "Acompañamiento" },
  { value: "camera", label: "Cámara" },
  { value: "scroll-text", label: "Certificado" },
  { value: "handshake", label: "Manos unidas" },
  { value: "briefcase-business", label: "Trabajo" },
  { value: "sparkles", label: "Brillos" },
  { value: "target", label: "Objetivo" },
  { value: "trophy", label: "Trofeo" },
  { value: "timer", label: "Tiempo" },
  { value: "footprints", label: "Movimiento" },
  { value: "play-circle", label: "Video" },
  { value: "shield-check", label: "Seguridad" },
  // Íconos genéricos útiles para links de Linktree (ver Glosario:
  // "Linktree"): Lucide no tiene marcas (Instagram/Facebook fueron
  // deprecados) — se usan los fallbacks genéricos que ya sugiere el
  // Glosario en vez de inventar SVGs de marca.
  { value: "message-circle", label: "Chat / WhatsApp" },
  { value: "map-pin", label: "Ubicación" },
  { value: "utensils", label: "Carta / Menú" },
  { value: "shopping-bag", label: "Pedidos" },
  { value: "link", label: "Red social / enlace" },
];

export function SiteIcon({
  iconKey,
  className = "",
  size = 28,
}: {
  iconKey?: string;
  className?: string;
  size?: number;
}) {
  return iconKey
    ? <SiteIconClient iconKey={iconKey} className={className} size={size} />
    : null;
}
