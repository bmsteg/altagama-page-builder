import { SiteIcon } from "./icons";
import { Body, Card, Container, Heading, Section, gridColsClass } from "./ui";
import { ImageWithSkeleton } from "./ImageWithSkeleton";

type Column = {
  imageUrl?: string;
  iconKey?: string;
  value?: string;
  title?: string;
  text?: string;
  url?: string;
};

type Props = {
  data: { variant?: string; title?: string; text?: string; anchorId?: string };
  items?: Record<string, unknown>[];
};

export function ThreeColumnsBlock({ data, items }: Props) {
  const columns = (items ?? []) as Column[];
  if (columns.length === 0) return null;

  const variant = data.variant || "default";

  return (
    <Section id={data.anchorId} className={`mc-columns mc-columns-${variant}`}>
      <Container>
        {(data.title || data.text) && <div className="mc-columns-heading text-center">
          {data.title && <Heading>{data.title}</Heading>}
          {data.text && <Body className="mt-3">{data.text}</Body>}
        </div>}
        <div className={"grid gap-6 " + gridColsClass(columns.length)}>
          {columns.map((column, index) => {
            if (variant === "stats") {
              return (
                <div key={index} className="text-center">
                  {column.value && (
                    <p className="text-4xl font-bold tracking-tight text-[var(--site-primary)] sm:text-5xl">
                      {column.value}
                    </p>
                  )}
                  {column.title && (
                    <h3 className="mt-3 text-lg font-semibold text-[var(--site-text)]">
                      {column.title}
                    </h3>
                  )}
                  {column.text && <p className="mt-2 text-[var(--site-muted)]">{column.text}</p>}
                </div>
              );
            }

            if (variant === "image_overlay") {
              return (
                <article
                  key={index}
                  className="relative min-h-[340px] overflow-hidden rounded-[var(--site-radius)] text-white"
                >
                  {column.imageUrl ? (
                    <ImageWithSkeleton src={column.imageUrl} alt="" wrapperClassName="absolute inset-0 h-full w-full overflow-hidden bg-gray-100" />
                  ) : null}
                  <div className="site-image-overlay absolute inset-0" />
                  <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-6">
                    {column.iconKey && <SiteIcon iconKey={column.iconKey} size={32} />}
                    {column.title && <h3 className="text-2xl font-bold">{column.title}</h3>}
                    {column.text && <p className="leading-relaxed text-white/90">{column.text}</p>}
                  </div>
                </article>
              );
            }

            const card = (
              <Card className="flex flex-col gap-3">
                {column.iconKey && (
                  <SiteIcon iconKey={column.iconKey} className="text-[var(--site-primary)]" size={32} />
                )}
                {column.imageUrl && (
                  <ImageWithSkeleton src={column.imageUrl} alt="" wrapperClassName="aspect-[4/3] w-full overflow-hidden rounded-[var(--site-radius)] bg-gray-100" />
                )}
                {column.title && (
                  <h3 className="text-lg font-semibold text-[var(--site-text)]">{column.title}</h3>
                )}
                {column.text && <p className="text-[var(--site-muted)]">{column.text}</p>}
              </Card>
            );
            return column.url?.startsWith("/") ? <a key={index} href={column.url} className="block transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-primary)]">{card}</a> : <div key={index}>{card}</div>;
          })}
        </div>
      </Container>
    </Section>
  );
}
