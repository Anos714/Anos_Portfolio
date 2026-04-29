import { Moon, Sun } from "lucide-react";
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
    setDarkMode((prev) => !prev);
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
          className="ml-4 shrink-0 rounded-md p-2 text-neutral-900 transition hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
