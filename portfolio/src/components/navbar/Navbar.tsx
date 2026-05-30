import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Work", href: "/work" },
    { label: "Blogs", href: "/blogs" },
    { label: "Resume", href: "/resume" },
  ];

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    const applyTheme = () => {
      document.documentElement.classList.toggle("dark", nextTheme);
      localStorage.setItem("theme", nextTheme ? "dark" : "light");
      setDarkMode(nextTheme);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transition = (
      document as Document & {
        startViewTransition?: (callback: () => void) => void;
      }
    ).startViewTransition;

    if (!transition || prefersReducedMotion) {
      applyTheme();
      return;
    }

    transition.call(document, applyTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 -mx-4 px-4 transition-all duration-300 ${
          scrolled
            ? "border-b border-neutral-200/60 bg-white/70 shadow-sm backdrop-blur-xl dark:border-neutral-800/70 dark:bg-neutral-900/70"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between py-4">
          <ul className="flex items-center gap-5 overflow-x-auto">
            {links.map((link) => (
              <li key={link.label} className="shrink-0">
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-neutral-700 transition hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            className="relative ml-4 grid size-9 shrink-0 place-items-center overflow-hidden rounded-md text-neutral-900 transition hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={darkMode ? "sun" : "moon"}
                className="absolute"
                initial={{ y: -8, rotate: -35, scale: 0.82, opacity: 0 }}
                animate={{ y: 0, rotate: 0, scale: 1, opacity: 1 }}
                exit={{ y: 8, rotate: 35, scale: 0.82, opacity: 0 }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
