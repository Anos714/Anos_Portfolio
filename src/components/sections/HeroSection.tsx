"use client";

import { motion, type Variants } from "framer-motion";
import { socials } from "@/data/site";
import { LinkPreview } from "../LinkPreview";
import { DottedLink } from "../DottedLink";
import { VisitorCount } from "../VisitorCount";

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
          I&apos;m a{" "}
          <span className="font-medium text-foreground">software developer</span>{" "}
          at heart, building{" "}
          <span className="font-medium text-foreground">
            AI-powered SaaS and full-stack web applications
          </span>
          . I&apos;m mostly active on{" "}
          {x && (
            <LinkPreview url={x.href}>{x.label}</LinkPreview>
          )}{" "}
          and{" "}
          {li && <LinkPreview url={li.href}>{li.label}</LinkPreview>}
          , where I share what I&apos;m building and learning.
        </motion.p>

        <motion.p
          variants={item}
          className="leading-relaxed text-foreground/80"
        >
          I work across{" "}
          <span className="font-medium text-foreground">
            Next.js, React.js, Node.js, Bun.js and TypeScript
          </span>
          , and I love shipping tools with real product thinking — from an
          autonomous Twitter growth engine to an ultra-fast blogging platform
          and a real-time social app. You can browse my{" "}
          <DottedLink href="/projects">projects</DottedLink>, check my{" "}
          <DottedLink href="/work">work</DottedLink>, or grab my{" "}
          <DottedLink href="/resume">resume</DottedLink>.
        </motion.p>

        <motion.p
          variants={item}
          className="leading-relaxed text-foreground/80"
        >
          I&apos;m currently open to full-stack opportunities where I can keep
          learning, shipping, and solving practical problems. For anything
          else,{" "}
          {mail && (
            <DottedLink href={mail.href}>{mail.label}</DottedLink>
          )}.
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
        </motion.div>

        <motion.div variants={item} className="mt-2">
          <VisitorCount />
        </motion.div>
      </div>
    </motion.div>
  );
}
