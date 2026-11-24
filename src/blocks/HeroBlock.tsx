import { SiteIcon } from "./icons";
import { CtaButton } from "./ui";
import { Carousel } from "../Carousel";

type Slide = {
  mode?: string;
  imageUrl?: string;
  videoUrl?: string;
  ratingText?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  iconKey?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
};

type Props = {
  data: Slide & { mode?: string };
  items?: Record<string, unknown>[];
};

function HeroSlide({ slide }: { slide: Slide }) {
  const gradient = slide.mode === "gradient" && !slide.imageUrl;
  const hasContent = Boolean(
    slide.iconKey || slide.title || slide.subtitle || (slide.buttonText && slide.buttonUrl),
  );
  return (
    <div className={gradient ? "relative h-full w-full overflow-hidden bg-gradient-to-br from-[#0a1734] via-[#123576] to-[#3d56df]" : "relative h-full w-full bg-gray-100"}>
      {gradient && <><div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#85b9ff]/20 blur-3xl" /><div className="pointer-events-none absolute -bottom-40 left-[-7rem] h-[28rem] w-[28rem] rounded-full bg-[#60d2d0]/15 blur-3xl" /></>}
      {slide.imageUrl ? (
        <img src={slide.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      {slide.imageUrl ? <div className="site-hero-overlay absolute inset-0" /> : null}
      {hasContent ? (
        <div
          className={
            "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-5 text-center " +
            (slide.imageUrl || gradient ? "text-white" : "text-[var(--site-text)]")
          }
        >
          <div className="hero-slide-content flex flex-col items-center gap-3">
            {slide.iconKey && <SiteIcon iconKey={slide.iconKey} size={34} />}
            {slide.title && (
              <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-6xl">
                {slide.title}
              </h1>
            )}
            {slide.subtitle && (
              <p className="max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl">
                {slide.subtitle}
              </p>
            )}
            {slide.buttonText && slide.buttonUrl && (
              <CtaButton href={slide.buttonUrl}>{slide.buttonText}</CtaButton>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SplitHeroSlide({ slide }: { slide: Slide }) {
  return (
      <section className="mc-hero">
        <div className="mc-hero-copy">
          {slide.ratingText && <p className="mc-rating">{slide.ratingText.startsWith("★★★★★") ? <><span className="mc-rating-stars" aria-hidden="true">★★★★★</span><strong>{slide.ratingText.replace(/^★★★★★\s*/, "")}</strong></> : slide.ratingText}</p>}
          {slide.title && <h1>{slide.title}</h1>}
          {slide.subtitle && <p className="mc-hero-subtitle">{slide.subtitle}</p>}
          <div className="mc-hero-actions">
            {slide.buttonText && slide.buttonUrl && <a className="mc-button" href={slide.buttonUrl}>{slide.buttonText}</a>}
            {slide.secondaryButtonText && slide.secondaryButtonUrl && <a className="mc-button mc-button-outline" href={slide.secondaryButtonUrl}>{slide.secondaryButtonText}</a>}
          </div>
        </div>
        <div className="mc-hero-media">
          {slide.videoUrl ? <video autoPlay muted loop playsInline poster={slide.imageUrl}><source src={slide.videoUrl} type="video/mp4" /></video> : slide.imageUrl ? <img src={slide.imageUrl} alt="" /> : null}
        </div>
      </section>
  );
}

export function HeroBlock({ data, items }: Props) {
  if (data.mode === "split") return <SplitHeroSlide slide={data} />;
  if (data.mode === "split_slider") {
    const splitSlides = (items ?? []).map((item) => ({ ...data, ...item, mode: "split" } as Slide)).filter((slide) => slide.imageUrl);
    if (splitSlides.length === 0) return <SplitHeroSlide slide={data} />;
    return <div className="mc-hero-slider"><Carousel slides={splitSlides.map((slide, index) => <SplitHeroSlide key={index} slide={slide} />)} autoplayMs={6500} /></div>;
  }
  const slides = data.mode === "slider" ? ((items ?? []) as Slide[]) : [data];
  const validSlides = slides.filter((slide) => slide.imageUrl || slide.title || slide.subtitle);
  if (validSlides.length === 0) return null;
  return (
    <section className="relative h-[72svh] min-h-[460px] max-h-[680px] w-full overflow-hidden bg-gray-100">
      <Carousel
        slides={validSlides.map((slide, index) => <HeroSlide key={index} slide={slide} />)}
        autoplayMs={5000}
        className="h-full"
      />
    </section>
  );
}
