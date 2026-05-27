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
  const [themeAnimation, setThemeAnimation] = useState<{
    id: number;
    toDark: boolean;
  } | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const nextTheme = !prev;
      setThemeAnimation({ id: Date.now(), toDark: nextTheme });
      return nextTheme;
    });
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
      <AnimatePresence>
        {themeAnimation ? (
          <motion.div
            key={themeAnimation.id}
            className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.82,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => setThemeAnimation(null)}
          >
            <motion.div
              className={`absolute inset-x-0 top-0 h-full origin-top ${
                themeAnimation.toDark ? "bg-neutral-950/85" : "bg-white/85"
              } backdrop-blur-sm`}
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className={`absolute inset-x-0 top-0 h-24 ${
                themeAnimation.toDark
                  ? "bg-gradient-to-b from-neutral-950 to-transparent"
                  : "bg-gradient-to-b from-white to-transparent"
              }`}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "100vh", opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.92, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

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
