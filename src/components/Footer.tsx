import { footerLinks } from "@/data/site";
import { LinkPreview } from "./LinkPreview";

export function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-2xl px-4 pb-20 pt-10">
      <div className="flex flex-col items-center gap-4">
        <p className="max-w-md text-center text-sm leading-relaxed text-foreground/60">
          Built by yours truly. Here&apos;s the{" "}
          <LinkPreview url={footerLinks.code.href}>
            {footerLinks.code.label}
          </LinkPreview>{" "}
          for this website. Design inspired by{" "}
          <LinkPreview url={footerLinks.credit.href}>
            {footerLinks.credit.label}
          </LinkPreview>
          .
        </p>
      </div>
    </footer>
  );
}
