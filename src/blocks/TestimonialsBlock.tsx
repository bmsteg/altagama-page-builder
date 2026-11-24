import { Quote } from "lucide-react";
import { Body, Card, Container, Eyebrow, Heading, gridColsClass } from "./ui";

type TestimonialItem = { image?: string; name?: string; role?: string; text?: string };

type Props = {
  data: { variant?: string; backgroundImage?: string; eyebrow?: string; title?: string; text?: string };
  items?: Record<string, unknown>[];
};

export function TestimonialsBlock({ data, items }: Props) {
  const testimonials = ((items ?? []) as TestimonialItem[]).filter((item) => item.text);
  if (testimonials.length === 0 && !data.title) return null;

  const overMedia = data.variant === "over_media";
  const sport = data.variant === "sport";
  return (
    <section className={overMedia ? "relative overflow-hidden px-4 py-12 md:py-20" : sport ? "mc-testimonials px-4 py-16 md:py-24" : ""}>
      {overMedia && data.backgroundImage ? (
        <>
          <img src={data.backgroundImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="site-image-overlay absolute inset-0" />
        </>
      ) : null}
      <Container className={overMedia ? "relative z-10" : ""}>
        {(data.eyebrow || data.title || data.text) && (
          <div className="mb-8 text-center md:mb-10">
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            {data.title && <Heading className={overMedia || sport ? "text-white" : ""}>{data.title}</Heading>}
            {data.text && <Body className={"mt-2 " + (overMedia || sport ? "text-white/90" : "")}>{data.text}</Body>}
          </div>
        )}
        <div
          className={
            "flex gap-5 overflow-x-auto pb-2 snap-x md:grid md:overflow-visible md:pb-0 " +
            gridColsClass(testimonials.length)
          }
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={(sport ? "mc-testimonial-card " : "") + "flex min-w-[280px] shrink-0 snap-start flex-col gap-4 md:min-w-0"}
            >
              <div className="flex items-center gap-3">
                {testimonial.image ? (
                  <img src={testimonial.image} alt="" className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                )}
                <div>
                  {testimonial.name && <p className={"font-semibold " + (sport ? "text-white" : "text-[var(--site-text)]")}>{testimonial.name}</p>}
                  {testimonial.role && <p className={"text-sm " + (sport ? "text-white/70" : "text-[var(--site-muted)]")}>{testimonial.role}</p>}
                </div>
              </div>
              <div>
                <Quote size={18} className="mb-1 text-[var(--site-primary)]" />
                <p className={"leading-relaxed " + (sport ? "text-white/90" : "text-[var(--site-muted)]")}>{testimonial.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
