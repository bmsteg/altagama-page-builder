

import { useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  slides: ReactNode[];
  autoplayMs?: number;
  className?: string;
  slideClassName?: string;
};

export function Carousel({ slides, autoplayMs = 5000, className = "", slideClassName = "" }: Props) {
  const hasMultiple = slides.length > 1;
  const [plugins] = useState(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasMultiple || autoplayMs <= 0 || reducedMotion) return [];
    return [Autoplay({ delay: autoplayMs, stopOnInteraction: true })];
  });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: hasMultiple }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  if (!hasMultiple) return <div className={className} data-active="true">{slides[0] ?? null}</div>;

  return (
    <div className={"relative h-full " + className}>
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              aria-hidden={index !== selectedIndex}
              data-active={index === selectedIndex}
              className={"h-full min-w-0 shrink-0 grow-0 basis-full " + slideClassName}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
      >
        <ChevronRight size={20} />
      </button>
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={"Ir al slide " + (index + 1)}
            onClick={() => emblaApi?.scrollTo(index)}
            className={
              "h-3 w-3 box-content rounded-full bg-clip-content p-2.5 transition " +
              (index === selectedIndex ? "bg-white" : "bg-white/50")
            }
          />
        ))}
      </div>
    </div>
  );
}
