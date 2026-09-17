import { headers } from "next/headers";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DottedDivider } from "@/components/DottedDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { DottedLink } from "@/components/DottedLink";
import { GuestbookForm } from "@/components/guestbook/GuestbookForm";
import { GuestbookList } from "@/components/guestbook/GuestbookList";
import { StarRating } from "@/components/guestbook/StarRating";
import { auth } from "@/lib/auth";
import {
  getGuestbookEntries,
  getGuestbookStats,
} from "@/data/guestbook";

export const metadata: Metadata = {
  title: "Guestbook",
  description:
    "Ratings and comments from visitors of Rahul Sain's portfolio — sign in with Google to leave your own.",
  alternates: { canonical: "/guestbook" },
};

export default async function GuestbookPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: rawPage } = await searchParams;
  const page = Math.max(1, Number(rawPage) || 1);

  const [session, { entries, total }, stats] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getGuestbookEntries({ page }),
    getGuestbookStats(),
  ]);

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-2xl px-4 pb-10">
          <div className="pt-4">
            <Reveal>
              <SectionHeading>Guestbook</SectionHeading>
            </Reveal>
          </div>

          {stats.count > 0 && (
            <Reveal delay={0.05}>
              <div className="mt-4 flex items-center gap-3">
                <span className="font-mono text-2xl font-light tabular-nums text-foreground">
                  {stats.average.toFixed(1)}
                </span>
                <div className="flex flex-col">
                  <StarRating value={Math.round(stats.average)} readOnly size={14} />
                  <span className="text-xs text-foreground/40">
                    from {stats.count}{" "}
                    {stats.count === 1 ? "visitor" : "visitors"}
                  </span>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="mt-6">
              <GuestbookForm user={user} />
            </div>
          </Reveal>

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <Reveal delay={0.05}>
            <GuestbookList
              entries={entries}
              total={total}
              page={page}
              currentUserId={session?.user?.id}
            />
          </Reveal>

          <div className="my-10 w-full shrink-0">
            <DottedDivider />
          </div>

          <Reveal>
            <p className="text-sm text-foreground/50">
              <DottedLink href="/">← Back home</DottedLink>
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
