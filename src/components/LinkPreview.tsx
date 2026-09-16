"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";
import { DottedUnderline } from "./DottedUnderline";

let clientHydrated = false;

function subscribeClientHydrated(callback: () => void) {
  clientHydrated = true;
  callback();
  return () => {
    clientHydrated = false;
  };
}

function getClientHydrationSnapshot() {
  return clientHydrated;
}

function getServerSnapshot() {
  return false;
}

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  const isMounted = React.useSyncExternalStore(
    subscribeClientHydrated,
    getClientHydrationSnapshot,
    getServerSnapshot,
  );

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <span className="hidden">
          <img src={src} width={width} height={height} alt="hidden image" />
        </span>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn(
            "group relative inline-flex transition-colors text-foreground/70 hover:text-primary",
            className,
          )}
          href={url}
        >
          <span className="relative inline-block">
            {children}
            <DottedUnderline />
          </span>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            side="top"
            align="center"
            sideOffset={10}
            className="relative z-[9999]"
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  className="rounded-xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/20 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-black/50"
                  style={{
                    x: translateX,
                  }}
                >
                  <a
                    href={url}
                    className="block rounded-xl border-2 border-transparent bg-white p-1 hover:border-neutral-200 dark:bg-neutral-900 dark:hover:border-neutral-700"
                    style={{ fontSize: 0 }}
                  >
                    <img
                      src={isStatic ? imageSrc : src}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt="preview image"
                    />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};
