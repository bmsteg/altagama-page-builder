

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/styles.css";
import { Carousel } from "../Carousel";
import { Container, Section } from "./ui";
import { SiteIcon } from "./icons";

type GalleryItem = { image?: string; videoUrl?: string; caption?: string };

type Props = {
  data: { variant?: string; iconKey?: string; title?: string; subtitle?: string; ratingText?: string };
  items?: Record<string, unknown>[];
};

const ASSUMED_WIDTH = 4;
const ASSUMED_HEIGHT = 3;

export function GalleryBlock({ data, items }: Props) {
  const galleryItems = ((items ?? []) as GalleryItem[]).filter((item) => item.image);
  if (data.variant === "story") {
    if (galleryItems.length === 0) return null;
    return <Section className="campaign-story-gallery"><Container>
      <div className="campaign-story-heading">
        <div>{data.iconKey && <SiteIcon iconKey={data.iconKey} className="mc-gallery-icon" size={32} />}{data.title && <h2>{data.title}</h2>}{data.subtitle && <p>{data.subtitle}</p>}</div>
        {data.ratingText && <span className="campaign-story-rating"><span aria-hidden="true">★★★★★</span> {data.ratingText}</span>}
      </div>
      <div className="campaign-story-track" aria-label="Galería de entrenamiento">
        {galleryItems.map((item, index) => <article className="campaign-story-card" key={index}>
          {item.videoUrl && /^(https?:\/\/|\/)/.test(item.videoUrl) ? <video src={item.videoUrl} poster={item.image} controls playsInline preload="none" aria-label={item.caption || `Video ${index + 1}`} /> : <img src={item.image} alt={item.caption || `Entrenamiento ${index + 1}`} loading="lazy" />}
          {item.caption && <strong>{item.caption}</strong>}
        </article>)}
      </div>
      <p className="campaign-story-hint">Deslizá para ver más →</p>
    </Container></Section>;
  }
  const photos = ((items ?? []) as GalleryItem[])
    .filter((item) => item.image)
    .map((item, index) => ({
      key: String(index),
      src: item.image as string,
      width: ASSUMED_WIDTH,
      height: ASSUMED_HEIGHT,
      alt: galleryItems[index]?.caption || `Imagen ${index + 1} de la galería`,
    }));

  if (photos.length === 0) return null;

  if (data.variant === "carousel") {
    return (
      <Section className="mc-gallery-carousel">
        <Container>
          {(data.title || data.subtitle) && <div className="mc-gallery-heading">
            {data.iconKey && <SiteIcon iconKey={data.iconKey} className="mc-gallery-icon" size={32} />}
            {data.title && <h2>{data.title}</h2>}
            {data.subtitle && <p>{data.subtitle}</p>}
          </div>}
          <div className="h-[clamp(260px,70vw,520px)] overflow-hidden rounded-[var(--site-radius)]">
            <Carousel
              autoplayMs={4500}
              className="h-full"
              slides={photos.map((photo, index) => (
                <figure key={photo.key} className="mc-gallery-slide h-full">
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                  {galleryItems[index]?.caption && <figcaption>{galleryItems[index].caption}</figcaption>}
                </figure>
              ))}
            />
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        {(data.iconKey || data.title || data.subtitle) && <div className="mc-gallery-heading">
          {data.iconKey && <SiteIcon iconKey={data.iconKey} className="mc-gallery-icon" size={32} />}
          {data.title && <h2>{data.title}</h2>}
          {data.subtitle && <p>{data.subtitle}</p>}
        </div>}
        <RowsPhotoAlbum
          photos={photos}
          defaultContainerWidth={700}
          spacing={8}
          targetRowHeight={220}
          render={{
            image: (props, { photo }) => (
              <img
                src={photo.src}
                alt={photo.alt ?? ""}
                className="h-full w-full rounded-[var(--site-radius)] object-cover"
              />
            ),
          }}
        />
      </Container>
    </Section>
  );
}
