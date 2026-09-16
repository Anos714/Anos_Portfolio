"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/data/site";
import { DottedUnderline } from "./DottedUnderline";
import { Typewriter } from "./Typewriter";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="relative mx-auto flex w-full max-w-2xl flex-col items-start gap-4 px-4 pt-4 md:pt-8"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute right-4 top-4 md:top-8">
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-2 pr-10">
        <motion.img
          src="/logo.jpeg"
          alt={`${site.name} logo`}
          className="aspect-square size-8 rounded-md object-cover shadow-md"
          whileHover={{ scale: 1.1, rotate: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        />
        <h1 className="text-xl font-medium tracking-tight text-foreground md:text-2xl">
          {site.name}
          <span className="font-normal text-foreground/50"> aka </span>
          <span className="font-normal italic text-foreground">
            <Typewriter />
          </span>
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {navLinks.map((link, i) => {
          const active = isActive(pathname, link.href);
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className={`group relative transition-colors ${
                  active ? "text-primary" : "text-foreground/70 hover:text-primary"
                }`}
              >
                <span className="relative inline-block">
                  {link.label}
                  {active && <DottedUnderline />}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
}
