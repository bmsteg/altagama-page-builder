import { SiteIcon } from "./icons";
import { Body, Container, CtaButton, Eyebrow, Heading, Section } from "./ui";
import { ImageWithSkeleton } from "./ImageWithSkeleton";

type Props = {
  data: {
    variant?: string;
    overlay?: string;
    iconKey?: string;
    eyebrow?: string;
    title?: string;
    text?: string;
    buttonText?: string;
    buttonUrl?: string;
    image?: string;
    imagePosition?: string;
  };
};

export function SplitContentBlock({ data }: Props) {
  const hasText = Boolean(
    data.eyebrow || data.title || data.text || (data.buttonText && data.buttonUrl),
  );
  if (!hasText && !data.image) return null;

  const textColumn = (
    <div className="relative z-40 flex min-w-0 flex-col gap-4 text-[var(--site-text)]">
      {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
      {data.title && <Heading>{data.title}</Heading>}
      {data.text && <Body className="whitespace-pre-wrap">{data.text}</Body>}
      {data.buttonText && data.buttonUrl && <CtaButton href={data.buttonUrl}>{data.buttonText}</CtaButton>}
    </div>
  );

  if (data.variant === "full_bleed" && data.image) {
    return (
      <section className="mc-full-bleed relative min-h-[420px] overflow-hidden px-4 py-16 text-white md:min-h-[520px] md:py-24">
        <ImageWithSkeleton src={data.image} alt="" wrapperClassName="absolute inset-0 h-full w-full overflow-hidden bg-gray-100" />
        <div className={(data.overlay === "dark" ? "site-image-overlay-dark" : "site-image-overlay") + " absolute inset-0"} />
        <Container className="relative z-10 flex min-h-[340px] items-center justify-center">
          <div className="flex w-full max-w-3xl flex-col items-center gap-4 text-center [&_h2]:text-white [&_p]:text-white/90">
            {data.iconKey && <SiteIcon iconKey={data.iconKey} className="text-white" size={38} />}
            {textColumn}
          </div>
        </Container>
      </section>
    );
  }

  if (!data.image) {
    return (
      <Section className={data.variant === "light" ? "mc-split mc-split-light" : "mc-split"}>
        <Container className="max-w-2xl text-center">{textColumn}</Container>
      </Section>
    );
  }

  const imageColumn = (
    <ImageWithSkeleton
      src={data.image}
      alt=""
      wrapperClassName="aspect-[4/3] w-full overflow-hidden rounded-[var(--site-radius)] bg-gray-100"
    />
  );
  const imageFirst = data.imagePosition === "left";

  return (
    <Section className={data.variant === "light" ? "mc-split mc-split-light" : "mc-split"}>
      <Container className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        {imageFirst ? (
          <>
            {imageColumn}
            {textColumn}
          </>
        ) : (
          <>
            {textColumn}
            {imageColumn}
          </>
        )}
      </Container>
    </Section>
  );
}
