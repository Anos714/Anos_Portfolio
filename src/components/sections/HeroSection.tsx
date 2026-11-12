"use client";

import { motion, type Variants } from "framer-motion";
import { site, socials } from "@/data/site";
import { LinkPreview } from "../LinkPreview";
import { DottedLink } from "../DottedLink";
import { VisitorCount } from "../VisitorCount";
import { CommandHint } from "../CommandPalette";

const linkOf = (label: string) => socials.find((x) => x.label === label);

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  const x = linkOf("X / Twitter");
  const li = linkOf("LinkedIn");
  const gh = linkOf("GitHub");
  const medium = linkOf("Medium");
  const mail = linkOf("Email");

  return (
    <motion.div
      id="home"
      className="scroll-mt-24 text-foreground pt-4 text-base"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-4">
        <motion.p
          variants={item}
          className="leading-relaxed text-foreground/80"
        >
          I build{" "}
          <span className="font-medium text-foreground">
            AI-powered SaaS and full-stack web apps
          </span>{" "}
          with Next.js, React, Node.js, Bun, and TypeScript. I share what I
          ship on{" "}
          {x && <LinkPreview url={x.href}>{x.label}</LinkPreview>} and{" "}
          {li && <LinkPreview url={li.href}>{li.label}</LinkPreview>}.
        </motion.p>

        <motion.p
          variants={item}
          className="leading-relaxed text-foreground/80"
        >
          Recent work includes{" "}
          <span className="font-medium text-foreground">stackit</span> (343
          weekly npm downloads),{" "}
          <span className="font-medium text-foreground">Kilosmith</span> (15+
          users), Xcel, and Inkwell. Browse my{" "}
          <DottedLink href="/projects">projects</DottedLink>, see my{" "}
          <DottedLink href="/work">work</DottedLink>, or grab my{" "}
          <DottedLink href="/resume">resume</DottedLink>.
        </motion.p>

        <motion.p
          variants={item}
          className="leading-relaxed text-foreground/80"
        >
          I&apos;m open to full-stack roles where I can ship real products and
          learn from the team.{" "}
          {mail && (
            <DottedLink href={mail.href}>{mail.label}</DottedLink>
          )}{" "}
          me or{" "}
          <DottedLink href={site.cal} target="_blank" rel="noopener noreferrer">
            book a call
          </DottedLink>
          .
        </motion.p>

        <motion.div
          variants={item}
          className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm text-foreground/70"
        >
          <span className="mr-1 text-foreground/50">Also find me on</span>
          {gh && <LinkPreview url={gh.href}>{gh.label}</LinkPreview>}
          <span className="text-foreground/30">·</span>
          {li && <LinkPreview url={li.href}>{li.label}</LinkPreview>}
          <span className="text-foreground/30">·</span>
          {x && <LinkPreview url={x.href}>{x.label}</LinkPreview>}
          <span className="text-foreground/30">·</span>
          {medium && <LinkPreview url={medium.href}>{medium.label}</LinkPreview>}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-2 flex flex-wrap items-center gap-2"
        >
          <VisitorCount />
          <CommandHint />
        </motion.div>
      </div>
    </motion.div>
  );
}
