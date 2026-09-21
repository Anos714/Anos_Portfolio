import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { QuoteCarousel } from "@/components/quotes/QuoteCarousel";
import { getQuotes } from "@/data/quotes";

export async function QuotesSection() {
  const quotes = await getQuotes();

  return (
    <section id="quotes" className="flex scroll-mt-24 flex-col gap-6">
      <Reveal>
        <SectionHeading>Words that stuck</SectionHeading>
      </Reveal>

      <Reveal delay={0.05}>
        <QuoteCarousel quotes={quotes} />
      </Reveal>
    </section>
  );
}
