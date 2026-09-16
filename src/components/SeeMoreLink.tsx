import Link from "next/link";

export function SeeMoreLink({
  href,
  label = "See more",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/link inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-primary ${className}`}
    >
      {label}
      <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
