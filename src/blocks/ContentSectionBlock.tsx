import { SiteIcon } from "./icons";
import { Body, Container, CtaButton, Eyebrow, Heading, Section } from "./ui";

type Props = {
  data: {
    variant?: string;
    iconKey?: string;
    eyebrow?: string;
    title?: string;
    text?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
};

export function ContentSectionBlock({ data }: Props) {
  const hasContent = Boolean(
    data.iconKey || data.eyebrow || data.title || data.text || (data.buttonText && data.buttonUrl),
  );
  if (!hasContent) return null;

  return (
    <Section className={data.variant ? `mc-content mc-content-${data.variant}` : undefined}>
      <Container className="flex max-w-2xl flex-col items-center gap-4 text-center">
        {data.iconKey && <SiteIcon iconKey={data.iconKey} className="text-[var(--site-primary)]" size={34} />}
        {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
        {data.title && <Heading>{data.title}</Heading>}
        {data.text && <Body className="whitespace-pre-wrap">{data.text}</Body>}
        {data.buttonText && data.buttonUrl && <CtaButton href={data.buttonUrl}>{data.buttonText}</CtaButton>}
      </Container>
    </Section>
  );
}
