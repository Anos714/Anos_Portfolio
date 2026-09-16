import { getTech } from "@/data/tech";

export function TechIcon({
  name,
  className = "size-4",
}: {
  name: string;
  className?: string;
}) {
  const tech = getTech(name);
  return (
    <img
      src={tech.icon}
      alt={tech.name}
      title={tech.name}
      className={`${className} dark:invert`}
    />
  );
}
