import { getCalApi } from "@calcom/embed-react";
import { site } from "@/data/site";

const NAMESPACE = "got-a-project-in-mind";

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

let calApiPromise: Promise<CalApi> | null = null;

/** Load the Cal.com embed once and reuse the same namespaced API. */
function calApi() {
  if (!calApiPromise) {
    calApiPromise = getCalApi({ namespace: NAMESPACE }).catch((error) => {
      // A later click may retry after a transient network failure.
      calApiPromise = null;
      throw error;
    });
  }
  return calApiPromise;
}

/** Warm the embed ahead of the first click (safe to call repeatedly). */
export function prefetchCalBooking() {
  void calApi().catch(() => {});
}

export async function openCalBooking() {
  try {
    const cal = await calApi();
    const dark = document.documentElement.classList.contains("dark");

    cal("ui", {
      theme: dark ? "dark" : "light",
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: {
        light: { "cal-brand": "#171717" },
        dark: { "cal-brand": "#ededed" },
      },
    });
    cal("modal", {
      calLink: site.calLink,
      config: { layout: "month_view" },
    });
  } catch {
    // Never dead-end: fall back to the public booking page.
    window.open(site.cal, "_blank", "noopener,noreferrer");
  }
}
