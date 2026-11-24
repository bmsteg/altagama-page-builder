

// Shimmer mientras carga + fade-in al terminar (mismo criterio que el sheet
// de producto de Carta, ver CartaClient) — reusable en cualquier bloque del
// Page Builder que hoy muestra la imagen de golpe apenas decodifica.
export function ImageWithSkeleton({
  src,
  alt,
  imgClassName = "h-full w-full object-cover",
  wrapperClassName = "relative h-full w-full overflow-hidden bg-gray-100",
}: {
  src: string;
  alt: string;
  imgClassName?: string;
  wrapperClassName?: string;
}) {
  const hasPosition = /(?:^|\s)(?:relative|absolute|fixed|sticky)(?:\s|$)/.test(wrapperClassName);

  return (
    // The shimmer is absolutely positioned. Card images need a relative
    // containing block, while full-bleed images must keep their absolute
    // positioning supplied by the caller.
    <div className={`${hasPosition ? "" : "relative "}isolate ${wrapperClassName}`}>
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(100deg, #eee 30%, #f7f7f7 45%, #eee 60%)",
          backgroundSize: "300% 100%",
          animation: "site-image-shimmer 1.3s ease-in-out infinite",
        }}
      />
      <img
        src={src}
        alt={alt}
        className={`relative z-10 ${imgClassName}`}
      />
    </div>
  );
}
