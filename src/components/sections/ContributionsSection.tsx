import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { ContributionsGraph } from "@/components/contributions/ContributionsGraph";
import { getContributions } from "@/data/contributions";

export async function ContributionsSection() {
  const weeks = await getContributions();

  if (!weeks) return null;

  const total = weeks.flat().reduce((sum, day) => sum + day.count, 0);

  return (
    <section id="contributions" className="flex scroll-mt-24 flex-col gap-6">
      <Reveal>
        <SectionHeading>Contributions</SectionHeading>
      </Reveal>

      <Reveal delay={0.05}>
        <ContributionsGraph weeks={weeks} total={total} />
      </Reveal>
    </section>
  );
}
