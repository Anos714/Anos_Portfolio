import { headers } from "next/headers";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { SeeMoreLink } from "../SeeMoreLink";
import { GuestbookEntryCard } from "@/components/guestbook/GuestbookEntryCard";
import { StarRating } from "@/components/guestbook/StarRating";
import { GuestbookForm } from "@/components/guestbook/GuestbookForm";
import { auth } from "@/lib/auth";
import {
  getGuestbookEntryByUser,
  getGuestbookStats,
  getRecentGuestbookEntries,
} from "@/data/guestbook";

export async function GuestbookSection() {
  const [session, entries, stats] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getRecentGuestbookEntries(3),
    getGuestbookStats(),
  ]);

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  const existingEntry = session?.user
    ? await getGuestbookEntryByUser(session.user.id)
    : null;

  return (
    <section id="guestbook" className="flex scroll-mt-24 flex-col gap-4">
      <Reveal>
        <SectionHeading>Guestbook</SectionHeading>
      </Reveal>

      {stats.count > 0 && (
        <Reveal delay={0.05}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-light tabular-nums text-foreground">
              {stats.average.toFixed(1)}
            </span>
            <div className="flex flex-col">
              <StarRating
                value={Math.round(stats.average)}
                readOnly
                size={14}
              />
              <span className="text-xs text-foreground/40">
                from {stats.count}{" "}
                {stats.count === 1 ? "visitor" : "visitors"}
              </span>
            </div>
          </div>
        </Reveal>
      )}

      {/* Sign in with Google when logged out; the rating form when logged in. */}
      <Reveal delay={0.1}>
        <GuestbookForm
          user={user}
          existingEntry={existingEntry}
          callbackURL="/"
        />
      </Reveal>

      {entries.length > 0 && (
        <>
          <div className="my-2 flex flex-col gap-3">
            {entries.map((entry, i) => (
              <Reveal key={entry.id} delay={0.15 + i * 0.06}>
                <GuestbookEntryCard entry={entry} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15 + entries.length * 0.06}>
            <SeeMoreLink href="/guestbook" label="See all guestbook entries" />
          </Reveal>
        </>
      )}
    </section>
  );
}
